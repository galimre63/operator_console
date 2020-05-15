import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConnectionService } from './connection.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
            this.connection.setSid(resp.sid);
            ret.next(true);
          }
        });
        socket.on('connect_error', (err: Error) => {
          console.log('socket error:', err.message);
          this.connection.close();
          ret.next(false);
        });
        this.connection.sendMessage({ method: 'LOGIN', userName: username, password: psw });
      })
      .catch(err => {
        console.log('socket login err:', err);
        ret.next(false);
      });
    return ret;
  }

  logout() {
    this.connection.close();
    this.router.navigate(['/']);
  }

  public hasSession(): boolean {
    return this.connection.getSid().length > 0;
  }

}
