import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConnectionService } from './connection.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private join = false;

  constructor(
    private connection: ConnectionService,
    private router: Router) { }

  login(username: string, psw: string): Subject<boolean> {
    const ret: Subject<boolean> = new Subject<boolean>();
    this.connection.connect()
      .then(socket => {
        socket.on('loginOk', (resp) => {
          console.log('socket login ok:', resp);
          if (resp.loginOk) {
            ret.next(true);
            this.join = true;
          }
          socket.close();
        });
        socket.on('connect_error', (err: Error) => {
          console.log('socket error:', err.message);
          ret.next(false);
          socket.close();
        });
        this.connection.sendMessage(socket, { method: 'LOGIN', userName: username, password: psw });
      })
      .catch(err => {
        console.log('socket login err:', err);
        ret.next(false);
      });
    return ret;
  }

  public logout() {
    this.router.navigate(['/']);
  }

  public loginOk(): boolean {
    return this.join;
  }
}
