import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private url = 'http://localhost:5050';

  constructor() {
  }

  public connect(): Promise<any> {
    console.log('connect:', this.url);
    const socket = io(this.url);

    socket.on('message', (data: any) => {
      console.log('socket message:', data);
    });

    return new Promise<any>((resolve, reject) => {
      socket.on('connect', () => {
        console.log('socket connect');
        resolve(socket);
      });
      socket.on('connect_error', (err: Error) => {
        console.log('socket error:', err.message);
        socket.close();
        reject(err);
      });
    });
  }

  public sendMessage(socket: any, msg: any): void {
    if (socket && socket.connected) {
      socket.emit(msg.method, msg);
      console.log('msg sent :', msg);
    } else {
      console.log('websocket not ready!');
    }
  }

}
