import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, Location, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/index';

import { ApiService, JwtService, UserService, EmployeeService } from '~services';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
  ],
  providers: [
    ApiService,
    JwtService,
    AuthGuard,
    UserService,
    EmployeeService
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
