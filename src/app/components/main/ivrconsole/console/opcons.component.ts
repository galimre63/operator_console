import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Time } from '@angular/common';
import { Console } from 'src/app/classes/console';
import { Room } from 'src/app/classes/room';
import { ConnectionService } from 'src/app/services/connection.service';
import { Subject } from 'rxjs';
import { RoomClick } from './room/room.component';

@Component({
  selector: 'app-console',
  templateUrl: './opcons.component.html',
  styleUrls: []
})
export class OpConsComponent implements OnInit, OnDestroy {

  @Input() console: Console;
  @Input() user: string;
  @Input() password: string;

  public sumTime: Time = { hours: 0, minutes: 0 };
  public currentTime: Time = { hours: 0, minutes: 0 };
  private connected = false;

  constructor(private connection: ConnectionService) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.connection.close();
  }

  public addRoom(): void {
    if (this.console.rooms.length < 8) {
      this.console.rooms.push(new Room(this.console.rooms.length));
    }
  }

  public removeRoom(): void {
    if (this.console.rooms.length > 2) {
      this.console.rooms = this.console.rooms.slice(0, this.console.rooms.length - 1);
    }
  }

  public connect(): void {
    if (this.connected) {
      this.connection.close();
      this.connected = false;
      return;
    }

    this.connection.connect()
      .subscribe(socket => {
        this.connected = true;
        this.sendMessage({ method: 'START_OPCONS', opconsId: this.console.id });
      });
  }

  public isConnection() {
    return this.connected;
  }

  public roomClicked(event: [RoomClick, number]): void {
    if (event[0] === RoomClick.OnRoom) {
      const target: Room | undefined = this.console.rooms.find(room => room.id === event[1]);
      const source: Room[] = this.console.rooms.filter(room => room.id !== event[1]);
      if (target) {
        const targetId = target.id;
        source.forEach(room => {
          room.callers.filter(caller => caller.kivalasztva).forEach(caller => {
            this.sendMessage({ channel: caller.channel, room: room.id, target: targetId });
          });
        });
      }
    }
  }

  private move(callerId: number, from: number, to: number): void {

  }

  public receivedMessage(msg: any): void {
    console.log('console received:', msg);
    if (msg.isOpen) {
    }
  }

  private sendMessage(message: object): void {
    this.connection.sendMessage(message);
  }
}
