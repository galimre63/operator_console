import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';

import { IVRConsoleComponent } from './components/main/ivrconsole/ivrconsole.component';
import { OpConsComponent } from './components/main/ivrconsole/console/opcons.component';
import { RoomComponent } from './components/main/ivrconsole/console/room/room.component';
import { CallerComponent } from './components/main/ivrconsole/console/caller/caller.component';

import { UserSettingsComponent } from './components/main/user-settings/user-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    OpConsComponent,
    IVRConsoleComponent,
    CallerComponent,
    RoomComponent,
    LoginComponent,
    MainComponent,
    UserSettingsComponent
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
