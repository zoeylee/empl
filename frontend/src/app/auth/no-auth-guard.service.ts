import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '~services';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let expire = user.exp * 1000;
    let isAuthenticated = this.isAuth(expire);
    if (isAuthenticated) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
    //return this.userService.isAuthenticated.take(1).map(bool => !bool) ;
  }

  isAuth(exp: number) {
    let today = new Date();
    let now = today.getTime();
    if(exp > now) {
      return true;
    }
    else {
      return false;
    }
  }
}