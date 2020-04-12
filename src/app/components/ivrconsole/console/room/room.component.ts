import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/classes/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  @Input() room: Room;

  constructor() { }

  ngOnInit() {
  }

}
