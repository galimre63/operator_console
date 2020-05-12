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
    const param = { method: 'LOGIN', userName: username, password: psw };
    this.connection.connect()
      .subscribe(socket => {
        socket.on('loginOk', (resp) => {
          console.log('socket loginOk:', resp);
          if (resp.loginOk) {
            this.connection.setSid(resp.sid);
            ret.next(true);
          }
          this.connection.close();
        });
        this.connection.sendMessage(param);
      });
    return ret;
  }

  logout() {
    this.connection.close();
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  public hasSession(): boolean {
    return this.connection.getSid().length > 0;
  }

}
