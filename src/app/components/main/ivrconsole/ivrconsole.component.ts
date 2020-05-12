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
