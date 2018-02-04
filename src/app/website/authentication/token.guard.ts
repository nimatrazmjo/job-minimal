
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Rx";

import swal from 'sweetalert2';
import { Token } from "../../shared/authentication/token.model";
import { TokenService } from "../../shared/authentication/token.service";

@Injectable()
export class TokenGuard implements CanActivate {
  token: Token;
  tokenExpiration;
  private getDatetime = new Date();
  constructor(private router: Router, private tokenService: TokenService) {
    this.token = this.tokenService.getToken();
    this.tokenExpiration = this.token.getExpirationDate();
    if(this.tokenExpiration > this.getDatetime){
      // console.log(this.tokenExpiration, this.getDatetime)
    }
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
    if (this.tokenExpiration > this.getDatetime) {
      return true;
    } else {
      swal({
        type: 'info',
        title: 'Your Session has expired , please login again',
        showConfirmButton: true,
      });
      this.router.navigate(["/login"]);
      this.tokenService.removeToken();
      return;
    }
  }
}
