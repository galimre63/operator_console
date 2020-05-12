import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Caller } from 'src/app/classes/caller';

@Component({
  selector: 'app-caller',
  templateUrl: './caller.component.html',
  styleUrls: ['./caller.component.scss']
})
export class CallerComponent implements OnInit {

  @Input() caller: Caller;
  @Output() isClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public getClass(): string {
    const fund = 'container-fluid  border  h-100 ';
    if (this.caller.name.indexOf('operátor_') === 0) {
      if (this.caller.kivalasztva) {
        return fund + 'operator-selected';
      } else {
        return fund + 'operator';
      }
    } else {
      if (!this.caller.mute) {
        if (this.caller.kivalasztva) {
          return fund + 'caller-mute-selected';
        } else {
          return fund + 'caller-mute';
        }
      } else {
        if (this.caller.kivalasztva) {
          return fund + 'caller-selected';
        } else {
          return fund + 'caller';
        }
      }
    }
  }

  public onClick(event: any): void {
    this.isClicked.emit(true);
    this.caller.kivalasztva = !this.caller.kivalasztva;
  }
}
