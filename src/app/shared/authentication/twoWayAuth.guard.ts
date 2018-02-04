import { Token } from './token.model';
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Rx";
import { TokenService } from "./token.service";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class TwoWayAuthGuard implements CanActivate {
  token: Token;
  userId;
  session;
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private tokenService: TokenService) {
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
  ): Observable<boolean> | Promise<boolean> | boolean  {
    this.authenticationService.getLatestSession().subscribe(sessionRes => {
      this.session = sessionRes[0].closedAt;
      if (!this.session) {
        return true;
      }
      else {
        this.router.navigate(["/two-way-authentication"], { queryParams: { returnUrl: state.url } });
        return;
      }

    });
    return true;
  }
}
