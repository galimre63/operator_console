import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  constructor(private connection: ConnectionService) { }

  public connect(): any {
    return this.connection.getSocket()
      .on('', () => {

      });
  }

  public connected(): boolean {
    return this.connection.connected();
  }

  public sendMessage(msg: any): void {
    this.connection.sendMessage(msg);
  }

}
