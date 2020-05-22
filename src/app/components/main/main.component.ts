import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit {

  public selectedId = 0;

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  public logout(): void {
    this.authentication.logout();
  }
}
