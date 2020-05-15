import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  constructor(private connection: ConnectionService) { }

}
