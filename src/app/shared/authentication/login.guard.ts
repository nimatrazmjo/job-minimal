import { Token } from './token.model';
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router, ActivatedRoute
} from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Location } from '@angular/common';

@Injectable()
export class LoginGuard implements CanActivate {
  localStorage;
  route;
  constructor(private router: Router, private activeRoute: ActivatedRoute) {

    this.localStorage = localStorage.getItem('accessToken');
    this.route = window.location.pathname;

  }

  /**
   * Check if the user is logged in before calling http
   *
   * @param route
   * @param state
   * @returns {boolean}
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if(this.localStorage){
      let url = state.url;
      console.log(state.url, 'urll')
      // this.router.navigate([url])
      this.router.navigate(['/network'], {queryParams: {returnUrl: state.url}});
      // let previousUrl = this.route;
      // localStorage.setItem("previousUrl", this.route)
      return true;
    }
    else {
      console.log('you are not loggedin');
      this.router.navigate(["/login"], {queryParams: {returnUrl: state.url}});
      // return;
    }
  }
}
