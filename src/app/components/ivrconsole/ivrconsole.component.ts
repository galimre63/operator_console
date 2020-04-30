import { Component, OnInit } from '@angular/core';
import { Console } from 'src/app/classes/console';
import { Caller } from 'src/app/classes/caller';

export class Machine {
  public opconsId: number;
  public name: string;
  constructor(id: number, name: string) {
    this.opconsId = id;
    this.name = name;
  }
}

@Component({
  selector: 'app-ivrconsole',
  templateUrl: './ivrconsole.component.html',
  styleUrls: []
})
export class IVRConsoleComponent implements OnInit {

  public machines: Array<Machine> = [new Machine(0, 'C gép'), new Machine(1, 'Adástámogatás')];
  public consoles: Array<Console> = [new Console(0), new Console(1)];
  public selectedId = 0;

  constructor() {
    this.consoles[0].addCaller(new Caller({
      channel: 0,
      mute: false,
      name: 'operátor_0',
      aSzam: '06303096155',
      hivottSzam: '0680999888',
      hivasAzon: 123456789,
      kivalasztva: false,
    }));
  }

  ngOnInit() {
  }

  public onChangeObj(newObj) {
    this.selectedId = newObj;
  }

  public getOpconsClass(id: number): string {
    if (id !== this.selectedId) {
      return ' d-none';
    }
    return '';
  }
}
