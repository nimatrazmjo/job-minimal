import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";
import {configuration} from "../../../../../../environments/.env";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SecuritySettingService {
  serverUrl = configuration.API_BASE_URL;

  constructor(
    private _httpClient: HttpClient
  ) {}

  changeTwoWayAuth(towWayAuth: any, user_id: string): Observable<any> {
    console.log("auth: ", towWayAuth);
    let url = this.serverUrl + "/user/" + user_id;
    return this._httpClient
      .patch(url, towWayAuth)
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
