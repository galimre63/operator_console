import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private wsUri = 'ws://localhost:8088';
  private websocket: WebSocket = null;

  constructor() {
  }

  public connect(): Observable<any> {
    this.websocket = new WebSocket(this.wsUri);
    return new Observable(observer => {
      this.websocket.onopen = (evt) => observer.next({ isOpen: true });
      this.websocket.onmessage = (evt) => observer.next(evt.data);
      this.websocket.onerror = (evt) => observer.error(evt);
      this.websocket.onclose = () => observer.complete();
    });
  }

  /*public checkSocket():string {
    let stateStr:string = '';
    if (this.websocket != null) {
      switch (this.websocket.readyState) {
        case 0: {
          stateStr = "CONNECTING";
          break;
        }
        case 1: {
          stateStr = "OPEN";
          break;
        }
        case 2: {
          stateStr = "CLOSING";
          break;
        }
        case 3: {
          stateStr = "CLOSED";
          break;
        }
        default: {
          stateStr = "UNKNOW";
          break;
        }
      }
      console.log("WebSocket state = " + this.websocket.readyState + " ( " + stateStr + " )");
    } else {
      console.log("WebSocket is null");
    }
    return stateStr;
  }*/

  public sendMessage(msg: string): void {
    if (this.isReady()) {
      this.websocket.send(msg);
      console.log('msg sent :', '"' + msg + '"');
    } else {
      console.log('websocket not ready!');
    }
  }

  public isReady(): boolean {
    return this.websocket && this.websocket.readyState == 1;
  }

}
