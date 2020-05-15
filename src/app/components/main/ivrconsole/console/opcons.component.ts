import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Time } from '@angular/common';
import { Console } from 'src/app/models/console';
import { Room } from 'src/app/models/room';
import { RoomClick } from './room/room.component';
import { ConsoleService } from 'src/app/services/console.service';
import { Caller } from 'src/app/models/caller';

@Component({
  selector: 'app-opcons',
  templateUrl: './opcons.component.html',
  styleUrls: []
})
export class OpConsComponent implements OnInit, OnDestroy {

  readonly MAXROOM = 8;

  @Input() consoleModel: Console;
  @Input() user: string;
  @Input() password: string;

  public sumTime: Time = { hours: 0, minutes: 0 };
  public currentTime: Time = { hours: 0, minutes: 0 };
  public consoleJoin = false;

  constructor(private connection: ConsoleService) { }

  ngOnInit() { }

  ngOnDestroy() { }

  public addRoom(): void {
    if (this.consoleModel.rooms.length < this.MAXROOM) {
      this.consoleModel.rooms.push(new Room(this.consoleModel.rooms.length));
    }
  }

  public removeRoom(): void {
    if (this.consoleModel.rooms.length > 2) {
      this.consoleModel.rooms = this.consoleModel.rooms.slice(0, this.consoleModel.rooms.length - 1);
    }
  }

  public connect(): void {
    if (!this.connection.connected() || (this.connection.connected() && this.consoleJoin)) {
      this.connection.sendMessage({ method: 'DISCONNECT', opconsId: this.consoleModel.id });
      this.consoleModel.rooms.forEach(room => room.callers = []);
      this.consoleJoin = false;
      return;
    }

    this.connection.connect()
      .on('connect_error', (err: Error) => {
        console.log('socket error:', err.message);
        this.consoleJoin = false;
      })
      .on('newOp', (params: any) => {
        console.log('msg received:', params);
        this.consoleJoin = true;
        const chId = params.firstOperatorId + (this.consoleModel.id % 4);
        if (this.consoleModel.addCaller(new Caller({
          channel: chId,
          mute: false,
          name: 'operátor_' + params.channel,
          aSzam: '',
          hivottSzam: '',
          hivasAzon: 0,
          kivalasztva: false
        }))) {
          this.connection.sendMessage({ channel: chId, method: 'C_ADDTOROOM', room: this.sendRoomId(0) });
        }
      });
    this.connection.sendMessage({ method: 'START_OPCONS', opconsId: this.consoleModel.id });
  }

  private sendRoomId(roomId: number): number {
    return roomId + ((this.consoleModel.id % 4) * this.MAXROOM);
  }

  public roomClicked(event: [RoomClick, number]): void {
    if (event[0] === RoomClick.OnRoom) {
      const target: Room | undefined = this.consoleModel.rooms.find(room => room.id === event[1]);
      const source: Room[] = this.consoleModel.rooms.filter(room => room.id !== event[1]);
      if (target) {
        const targetId = target.id;
        source.forEach(room => {
          room.callers.filter(caller => caller.kivalasztva).forEach(caller => {
            this.connection.sendMessage({ method: 'MOVE', channel: caller.channel, from: room.id, to: targetId });
          });
        });
      }
    }
  }

}
