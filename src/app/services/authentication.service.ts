import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private connection: ConnectionService) { }

  login(username: string, psw: string): Subject<boolean> {
    const param = { method: 'LOGIN', userName: username, password: psw };
    const ret: Subject<boolean> = new Subject<boolean>();
    this.connection.connect()
      .subscribe(msgSub => {
        msgSub.subscribe(value => {
          console.log('received login request:', value);
          ret.next(value === 'OK');
          this.connection.close();
        });
        this.connection.sendMessage(JSON.stringify(param));
      });
    return ret;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}

interface LoginParam {
  userName: string;
  password: string;
};