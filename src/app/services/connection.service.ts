import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private url = 'http://localhost:5050';
  private socket: SocketIOClient.Socket;
  private messageSub: Subject<string> = new Subject<string>();

  constructor() {
  }

  public connect(): Observable<Subject<string>> {
    console.log('connect:', this.url);
    this.socket = socketIo(this.url);
    this.socket.on('message', (data: any) => {
      console.log('socket message:', data);
      this.messageSub.next(data);
    });
    return new Observable<Subject<string>>(observer => {
      console.log('socket event:connect');
      this.socket.on('connect', () => observer.next(this.messageSub));
    });
  }

  public sendMessage(msg: string): void {
    if (this.socket && this.socket.connected) {
      this.socket.send(msg);
      console.log('msg sent :', '"' + msg + '"');
    } else {
      console.log('websocket not ready!');
    }
  }

  public close(): void {
    this.socket.close();
    this.socket = undefined;
  }

}
