import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from 'src/app/models/room';

export enum RoomClick {
  OnRoom,
  OnCaller,
  Nothing
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @Input() room: Room;
  @Output() clicked: EventEmitter<[RoomClick, number]> = new EventEmitter<[RoomClick, number]>();

  public callerClicked: boolean;

  constructor() { }

  ngOnInit() {
  }

  public onCallerClicked(): void {
    this.callerClicked = true;
  }

  public onClick(event): void {
    if (this.callerClicked) {
      this.clicked.emit([RoomClick.OnCaller, this.room.id]);
    } else {
      this.clicked.emit([RoomClick.OnRoom, this.room.id]);
    }
    this.callerClicked = false;
  }

}
