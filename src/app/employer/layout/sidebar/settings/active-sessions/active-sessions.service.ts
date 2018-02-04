import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";
import {configuration} from "../../../../../../environments/.env";
import {AuthorizedHttp} from "../../../../routes/authentication/authorizedHttp.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ActiveSessionService {
  serverUrl = configuration.API_BASE_URL;

  constructor(
    private _httpClient: HttpClient
  ) {}

  getActiveSession(): Observable<any> {
    let url = `${this.serverUrl}/user/session`;
    return this._httpClient
      .get(url)
      .share()
      .catch(this.handleError);
  }

  getOtherSessions(page: number, perPage: number): Observable<any[]> {
    const start: number = (page - 1) * perPage;
    let filterStr = `{"where": {"closedAt": null} , "limit": ${perPage}, "skip": ${start}}`;
    let url = `${this.serverUrl}/user/session?filter=${filterStr}`;
    return this._httpClient
      .get(url)
      .share()
      .catch(this.handleError);
  }

  blockUserSession(session_id: string): Observable<any> {
    let url = this.serverUrl + "/user/session/" + session_id + "/blockSession";
    return this._httpClient
      .patch(url, {})
      .share()
      .catch(this.handleError);
  }

  getOtherSessionsCount(): Observable<number> {
    let url = `${this.serverUrl}/user/session/sessionCount?where={"closedAt": null}`;
    return this._httpClient
      .get(url)
      .share()
      .catch(this.handleError);
  }

  blockAllSessions(token: string): Observable<any> {
    let url = this.serverUrl + "/user/session/blockAllSessions";
    return this._httpClient
      .patch(url, {token: token})
      .share()
      .catch(this.handleError);
  }

  isSessionBlocked(): Observable<any> {
    let url = `${this.serverUrl}/user/session/isSessionBlocked`;
    return this._httpClient.get(url)


      .catch(this.handleError);
  }

  private handleError(error: any) {
    if(error instanceof Response) {
      return Observable.throw({status: error.status, text: error.json()} || {status: error.status, text: "Server error"});
      //return Observable.throw(error.json().message || 'server error');
    }
    return Observable.throw(error || 'server error');
  }

}
