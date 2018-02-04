import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'ngx-auth';

import { TokenService } from './token.service';
import { configuration } from '../../../environments/.env';
import { Http } from '@angular/http';

interface AccessData {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthenticationService implements AuthService {
  serverUrl = configuration.API_BASE_URL;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable<boolean> {
    return this.tokenService
      .getAccessToken()
      .map(token => !!token);
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    return this.tokenService.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable<AccessData> {
    return this.tokenService
      .getRefreshToken()
      .switchMap((refreshToken: string) => {
        return this.http.post(`http://localhost:3000/refresh`, { refreshToken });
      })
      .do(this.saveAccessData.bind(this))
      .catch((err) => {
         this.logout();

        return Observable.throw(err);
      });
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public login(): Observable<any> {
    return this.http.post(`http://localhost:3000/login`, {})
      .do((tokens: AccessData) => this.saveAccessData(tokens));
  }

  /**
   * Logout
   */
  public logout(): void {
    this.tokenService.removeToken();
    location.reload(true);
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  public saveAccessData({ accessToken, refreshToken }: AccessData) {
    this.tokenService
      .setToken(accessToken)
      .setRefreshToken(refreshToken);
  }

  public setToken(token: string) {
    localStorage.setItem("accessToken", token);
    return this;
  }

  public getItem() {
    return localStorage.getItem("deviceInfo");
  }


  onLogin(email: string, password: string, rememberMe: boolean): Observable<any> {
    let url = this.serverUrl + "/login";
    return this.http.post(url, { email: email, password: password, rememberMe: rememberMe })
      // .do((tokens: AccessData) => {
      //   this.saveAccessData({accessToken: tokens.accessToken, refreshToken: tokens.refreshToken})
      // })
      .catch(this.handleError);
  }


  public onLogout() {
    let url = this.serverUrl + "/logout";
    return this.http.get(url)
      .do(() => {
        this.logout();
      })
      .catch(err => {
        return Observable.throw(err);
      });
  }

  register(user: any): Observable<any> {
    let url = this.serverUrl + '/user/register';
    return this.http
      .post(url, user)
      .catch(this.handleError);
  }

  requestCode(email: string, password: string): Observable<any> {
    let url = this.serverUrl + "/user/requestNewCode";
    console.log("your email is: " + email);
    return this.http
      .post(url, { "email": email, "passwor": password })

      .catch(this.handleError);
  }

  resendCode(): Observable<any> {
    let url = this.serverUrl + "/user/resendCode";
    return this.http
      .post(url, {})
      .catch(this.handleError);
  }

  loginWithCode(typedCode): Observable<any> {
    let url = this.serverUrl + "/user/loginWithCode/" + typedCode;
    return this.http
      .post(url, {})
      .catch(err => {
        return Observable.throw(err);
      });
  }


  getLatestSession(): Observable<any> {
    let queryFilters = '{"limit": 1, "order": {"createdAt": -1}}';
    let url = `${this.serverUrl}/session?filter=${queryFilters}`;
    return this.http.get(url)
      // .map(res => {
      //   // this.sessionId = res.json()[0]._id;
      //   // this.closed = res.json()[0].closedAt;
      //   return res.json();
      // })
      .catch(err => {
        return Observable.throw(err);
      });
  }


  updateSession(id, closedAt: any): Observable<any> {
    let url = this.serverUrl + '/session/' + id;
    return this.http.patch(url, { closedAt })

      .catch(err => {
        return Observable.throw(err);
      });
  }

  addDeviceIdToSession(id, deviceUId): Observable<any> {
    let url = this.serverUrl + '/session/' + id + '/device';
    return this.http.patch(url, { deviceUId })

      .catch(err => {
        return Observable.throw(err);
      });
  }


  addSecureDeviceInfo(DeviceStatus): Observable<any> {
    let url = this.serverUrl + '/secureDevices';
    return this.http.post(url, DeviceStatus, {})

      .catch(err => {
        return Observable.throw(err);
      });
  }

  getSecureDeviceDetails(deviceUId: string): Observable<any> {
    let url = this.serverUrl + '/secureDevices/device/' + deviceUId;
    return this.http.get(url)

      .catch(err => {
        return Observable.throw(err);
      });
  }

  // private handleError(error: Response) {
  //   return Observable.throw({ status: error.status, text: error } || { status: error.status, text: "Server error" });
  // }

  private handleError(error: any) {
      if(error instanceof HttpErrorResponse) {
          return Observable.throw({status: error.status, text: error.error.message} || {status: error.status, text: "Server error"});
      }
      return Observable.throw(error || 'server error');
  }
}
