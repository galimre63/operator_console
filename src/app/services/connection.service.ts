import { Injectable } from '@angular/core';
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

  public connect(): Promise<any> {
    console.log('connect:', this.url);
    this.socket = io(this.url);

    this.socket.on('message', (data: any) => {
      console.log('socket message:', data);
    });

    return new Promise<any>((resolve, reject) => {
      this.socket.on('connect', () => {
        console.log('socket connect');
        resolve(this.socket);
      });
      this.socket.on('connect_error', (err: Error) => {
        console.log('socket error:', err.message);
        this.close();
        reject(err);
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
      this.sid = '';
    }
    this.socket = undefined;
  }

  public getSid(): string {
    return this.sid;
  }

  public setSid(sid0: string): void {
    this.sid = sid0;
  }

  public connected(): boolean {
    return (this.socket && this.socket.connected);
  }

  public getSocket(): any {
    return this.socket;
  }

}
