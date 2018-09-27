import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, take } from 'rxjs/operators';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';


@Injectable()
export class UserService {


  constructor (
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}

  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/user.json')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
  }

  login(credentials): Observable<any> {
    return this.apiService.post('/auth', credentials).pipe(map(
      data => {
        if (data.token) {
          const base64Url = data.token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const user: User = JSON.parse(window.atob(base64));
          user.token = data.token;
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.setAuth(user);
          }
          return user;
        }
        return new User();
      }
    ));
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.purgeAuth();
  }

  getCurrentUser():  Observable<any> {
    return this.apiService.get(`/user/current`)
           .map(res => res);
  }

}
