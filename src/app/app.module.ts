import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OpConsComponent } from './components/ivrconsole/console/opcons.component';
import { IVRConsoleComponent } from './components/ivrconsole/ivrconsole.component';
import { CallerComponent } from './components/ivrconsole/console/caller/caller.component';
import { RoomComponent } from './components/ivrconsole/console/room/room.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    OpConsComponent,
    IVRConsoleComponent,
    CallerComponent,
    RoomComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
