import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Time } from '@angular/common';
import { Console } from 'src/app/classes/console';
import { Room } from 'src/app/classes/room';
import { ConnectionService } from 'src/app/services/connection.service';
import { Subscription } from 'rxjs';
import { RoomClick } from './room/room.component';
import { Caller } from 'src/app/classes/caller';

@Component({
  selector: 'app-console',
  templateUrl: './opcons.component.html',
  styleUrls: []
})
export class OpConsComponent implements OnInit, OnDestroy {

  @Input() console: Console;

  public sumTime: Time = { hours: 0, minutes: 0 };
  public currentTime: Time = { hours: 0, minutes: 0 };
  private connectionSub: Subscription = null;

  constructor(public connection: ConnectionService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.connectionSub) {
      this.connectionSub.unsubscribe();
    }
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
    if (this.connectionSub) {
      this.connectionSub.unsubscribe();
      this.connectionSub = null;
    } else {
      this.connectionSub = this.connection.connect().subscribe(
        data => this.receivedMessage(data),
        error => { console.log('error in socket:', error); this.connectionSub = null; },
        () => console.log('connection is complete')
      );
    }
  }

  public isConnection() {
    return this.connectionSub != null;
  }

  public roomClicked(event: [RoomClick, number]): void {
    if (event[0] === RoomClick.OnRoom) {
      const target: Room | undefined = this.console.rooms.find(room => room.id === event[1]);
      const source: Room[] = this.console.rooms.filter(room => room.id !== event[1]);
      if (target) {
        const targetId = target.id;
        source.forEach(room => {
          room.callers.filter(caller => caller.kivalasztva).forEach(caller => {
            this.sendMessage('' + caller.channel + ' ' + room.id + ' ' + targetId);
          });
        });
      }
    }
  }

  private move(callerId: number, from: number, to: number): void {

  }

  /*
  client                  server
  connect
          ->  START OPCONS
          ->  LOGIN <user> <password>
          <-  LOGIN NACK
  
          <-  new <opconsId> <firtOperatorId> ->
  add operator
          ->  <firstOperatorId> C_ADDTOROOM 0
  
          <-  re <opconsId> <firstOperatorId>
          ->  GETCONFIG
          <-  re_addhivo <szobaszam> <recvSzobaszam> <channel> <hivott> <hivo> <mute> <hivasAzon>
  add caller/operator
  
          <-  C_ADDHIVO <szobaszam> <channel> <mute> <phoneHivott> <phoneHivo> <hivasAzon>
  add caller
  
          ->  kill <channel>
          <-  C_REMOVEHIVO <szobaszam> <channel>
  remove caller
  
          <-  C_SIGN <channel> <phoneHivott> <phoneHivo> <hivasAzon>
  add varakozok
  
          ->  szetKapcsol <channel> <szobaszam>
  move caller to varakozok
  
          ->  <channel> C_MOVE <scrRoom> <trgRoom> <mute>
          <-  C_MOVE <channel> <honnan> <hova>
  move caller/operator
  */

  public receivedMessage(msg: any): void {
    console.log('received:', msg);
    if (msg.isOpen) {
      this.sendMessage('START OPCONS ' + this.console.id + '\n\rLOGIN user password\n\r');
    }
  }

  private sendMessage(message: string): void {
    this.connection.sendMessage(message);
  }
}
