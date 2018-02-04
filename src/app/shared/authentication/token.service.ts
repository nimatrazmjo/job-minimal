import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Token } from './token.model';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class TokenService {

  // /**
  //  * Get access token
  //  * @returns {Observable<string>}
  //  */
  // public getAccessToken(): Observable<string> {
  //   const token: string = <string>localStorage.getItem('accessToken');
  //   return Observable.of(token);
  // }

  // /**
  //  * Get refresh token
  //  * @returns {Observable<string>}
  //  */
  // public getRefreshToken(): Observable<string> {
  //   const token: string = <string>localStorage.getItem('refreshToken');
  //   return Observable.of(token);
  // }

  // /**
  //  * Set access token
  //  * @returns {TokenStorage}
  //  */
  // public setAccessToken(token: string): TokenService {
  //   localStorage.setItem('accessToken', token);

  //   return this;
  // }

  // /**
  // * Set refresh token
  // * @returns {TokenStorage}
  // */
  // public setRefreshToken(token: string): TokenService {
  //   localStorage.setItem('refreshToken', token);

  //   return this;
  // }

  // /**
  // * Remove tokens
  // */
  // public clear() {
  //   localStorage.removeItem('accessToken');
  //   localStorage.removeItem('refreshToken');
  // }


  private _token: BehaviorSubject<Token>;

  constructor() {
    this._token = <BehaviorSubject<Token>>new BehaviorSubject(new Token(localStorage.getItem('accessToken')));
  }

  /**
   * Get the current token.
   */
  getToken(): Token {
    let token = this._token.getValue();
    return (token && token.token) ? token : null;
  }

  public getRefreshToken() {
    const token: string = <string>localStorage.getItem('refreshToken');
    return Observable.of(token);
  }

  /**
   * Returns an stream of tokens.
   */
  getTokenStream(): Observable<Token> {
    return this._token.asObservable();
  }

  /**
   * Update the current token.
   */
  setToken(token: any) {
    this._token.next(new Token(token.token));
    localStorage.setItem('accessToken', token.token);
    return this;
  }

  public setRefreshToken(token: string): TokenService {
    localStorage.setItem('refreshToken', token);
    return this;
  }

  /**
   * Remove the current token.
   */
  removeToken() {
    this._token.next(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getAccessTokenId(): string {
    const tokenId = this.getToken();
    return (tokenId && tokenId.token) ? tokenId.token : null;
  }

  public getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('accessToken');
    return Observable.of(token);
  }


  getCurrentUserId(): string {
    const tokenId = this.getToken();
    if (tokenId) {
      let decoded = jwt_decode(tokenId && tokenId.token);
      let userId = decoded._id;
      return userId;
    }
    else {
      return "";
    }
  }

  getCurrentUser(): string {
    const tokenId = this.getToken();
    if (tokenId) {
      let decoded = jwt_decode(tokenId && tokenId.token);
      return decoded;
    }
    return null;
  }
}