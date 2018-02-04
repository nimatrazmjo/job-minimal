import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {configuration} from "../../../../../../environments/.env";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class ChangePasswordService {
  serverUrl = configuration.API_BASE_URL;

  constructor(private _httpClient: HttpClient) {}

  changePassword(data: any): Observable<any> {
    let url = this.serverUrl + "/user/changePassword";
    return this._httpClient
      .post(url, JSON.stringify(data))
      .share()
      .catch(this.handleError);
  }

  handleError(error: any) {
      if(error instanceof HttpErrorResponse) {
          return Observable.throw({status: error.status, text: error.error.message} || {status: error.status, text: "Server error"});
      }
      return Observable.throw(error || 'server error');
  }

}
