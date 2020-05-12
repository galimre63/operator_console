import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private sid = '';
  private url = 'http://localhost:5050';
  private socket;

  constructor() {
  }

  public connect(): Observable<any> {
    console.log('connect:', this.url);
    this.socket = io(this.url);

    this.socket.on('message', (data: any) => {
      console.log('socket message:', data);
    });
    this.socket.on('connect-error', (err) => {
      console.log('socket error:', err);
    });
    this.socket.on('connect-timeout', (err) => {
      console.log('socket error:', err);
    });

    return new Observable<any>(observer => {
      this.socket
        .on('connect', () => {
          console.log('socket connect');
          return observer.next(this.socket);
        });
    });
  }

  public sendMessage(msg: any): void {
    if (this.socket && this.socket.connected) {
      msg.sid = this.sid;
      this.socket.emit(msg.method, msg);
      console.log('msg sent :', msg);
    } else {
      console.log('websocket not ready!');
    }
  }

  public close(): void {
    if (this.socket) {
      console.log('socket close');
      this.socket.close();
    }
    this.socket = undefined;
  }

  public getSid(): string {
    return this.sid;
  }

  public setSid(sid0: string): void {
    this.sid = sid0;
  }
}
