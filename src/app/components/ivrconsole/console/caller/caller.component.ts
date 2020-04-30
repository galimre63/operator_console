import { Component, OnInit, Input } from '@angular/core';
import { Caller } from 'src/app/classes/caller';

@Component({
  selector: 'app-caller',
  templateUrl: './caller.component.html',
  styleUrls: ['./caller.component.scss']
})
export class CallerComponent implements OnInit {

  @Input() caller: Caller;

  constructor() { }

  ngOnInit() {
  }

  public getClass(): string {
    if (this.caller.name.indexOf('operátor_') === 0) {
      if (this.caller.kivalasztva) {
        return 'operator-selected';
      } else {
        return 'operator';
      }
    } else {
      if (!this.caller.mute) {
        if (this.caller.kivalasztva) {
          return 'caller-mute-selected';
        } else {
          return 'caller-mute';
        }
      } else {
        if (this.caller.kivalasztva) {
          return 'caller-selected';
        } else {
          return 'caller';
        }
      }
    }
  }

  public select(): void {
    this.caller.kivalasztva = !this.caller.kivalasztva;
  }
}
