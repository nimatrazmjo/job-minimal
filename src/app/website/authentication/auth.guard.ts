
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Rx";
import * as jwt_decode from 'jwt-decode';
import { Token } from "../../shared/authentication/token.model";
import { TokenService } from "../../shared/authentication/token.service";
import { configuration } from "../../../environments/.env";

@Injectable()
export class AuthGuard implements CanActivate {
  token: Token;
  route;
  
  constructor(private router: Router, private tokenService: TokenService) {
    this.token = this.tokenService.getToken();
    // this.route = window.location.pathname;
    // localStorage.setItem("previousUrl", this.route)
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
    if (this.token && !this.token.isExpired()) {
      return true;
    }
    else {
      // if(state.url === '/logout') {
        this.router.navigate(["/login"]);
      // } else {
        // this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
      // }
      return;
    }
  }
}
