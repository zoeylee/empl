import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from '~services';
import { User } from '~models';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  public currentUser: User;
  public isAuthenticated: boolean = false;
  
  constructor(public userService: UserService, private router: Router) {
    
    
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.getCurrent();
      }
    });
  }

  getCurrent() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!_.isNull(this.currentUser) && !_.isUndefined(this.currentUser)) {
      let expire = this.currentUser.exp * 1000;
      this.isAuth(expire);
    }
  }

  onLogout() {
    this.currentUser = new User();
    this.isAuthenticated = false;
    this.userService.logout();
    this.router.navigate(['']);
  }

  isAuth(exp: number) {
    let today = new Date();
    let now = today.getTime();
    if(exp > now) {
      this.isAuthenticated = true;
    }
    else {
      this.isAuthenticated = false;
      this.router.navigate[''];
    }
  }
}
