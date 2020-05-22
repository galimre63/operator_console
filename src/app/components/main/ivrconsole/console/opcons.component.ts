import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Time } from '@angular/common';
import { Console } from 'src/app/models/console';
import { Room } from 'src/app/models/room';
import { RoomClick } from './room/room.component';
import { Caller } from 'src/app/models/caller';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-opcons',
  templateUrl: './opcons.component.html',
  styleUrls: []
})
export class OpConsComponent implements OnInit {

  readonly MAXROOM = 8;

  @Input() consoleModel: Console;
  @Input() user: string;
  @Input() password: string;

  public sumTime: Time = { hours: 0, minutes: 0 };
  public currentTime: Time = { hours: 0, minutes: 0 };
  public socket;

  constructor(private connection: ConnectionService) { }

  ngOnInit() { }

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
    if (this.socket && this.socket.connected) {
      this.connection.sendMessage(this.socket, { method: 'DISCONNECT', opconsId: this.consoleModel.id });
      this.consoleModel.rooms.forEach(room => room.callers = []);
      this.socket = undefined;
      return;
    }

    this.connection.connect().then(socket0 => {
      this.socket = socket0;
      this.socket
        .on('connect_error', (err: Error) => {
          console.log('socket error:', err.message);
          this.socket = undefined;
        })
        .on('NACK', () => {
          console.log('msg received NACK');
        })
        .on('newOp', (params: any) => {
          console.log('msg received newOp:', params);
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
            this.connection.sendMessage(this.socket, { channel: chId, method: 'C_ADDTOROOM', room: this.sendRoomId(0) });
          }
        })
        .on('MOVE', (params: any) => {
          console.log('msg received MOVE:', params);
          // { channel: channel, from: from, to: to }
          const room: Room = this.consoleModel.rooms[params.from];
          const caller: Caller = room.callers.find((callerE: Caller) => callerE.channel === params.channel);
          const id: number = room.callers.indexOf(caller);
          this.consoleModel.rooms[params.from].callers.splice(id, 1);
          caller.kivalasztva = false;
          this.consoleModel.rooms[params.to].callers.push(caller);
        });
      this.connection.sendMessage(this.socket, { method: 'START_OPCONS', opconsId: this.consoleModel.id });
    });
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
            this.connection.sendMessage(this.socket, { method: 'MOVE', channel: caller.channel, from: room.id, to: targetId });
          });
        });
      }
    }
  }

}
