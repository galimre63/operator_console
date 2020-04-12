import { Component, OnInit } from '@angular/core';
import { Console } from 'src/app/classes/console';

@Component({
  selector: 'app-ivrconsole',
  templateUrl: './ivrconsole.component.html',
  styleUrls: ['./ivrconsole.component.css']
})
export class IVRConsoleComponent implements OnInit {

  public machines: Array<Machine> = [new Machine(0, 'C gép'), new Machine(1, 'Adástámogatás')];
  public selectedId: number = 0;
  public consoles: Array<Console> = [];

  constructor() {
    this.consoles.push(new Console(0));
    this.consoles.push(new Console(1));
  }

  ngOnInit() {
  }

  public onChangeObj(newObj) {
    this.selectedId = newObj;
  }

  public getOpconsClass(id: number): string {
    if (id != this.selectedId) {
      return ' d-none';
    }
    return '';
  }
}

export class Machine {
  public opconsId: number;
  public name: string;
  constructor(id: number, name: string) {
    this.opconsId = id;
    this.name = name;
  }
}