import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/take';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: Http,
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
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
  }

  login(credentials): Observable<any> {
    return this.apiService.post('/auth', credentials)
       .map(
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
        );
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.purgeAuth();
  }

  // getCurrentUser(): User {
  //   return this.currentUserSubject.value;
  // }
   
  getCurrentUser():  Observable<any> {
    return this.apiService.get(`/user/current`)
           .map(res => res);
  }

  update(user): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .map(data => {
      this.currentUserSubject.next(data.user);
      return data.user;
    });
  }

}
