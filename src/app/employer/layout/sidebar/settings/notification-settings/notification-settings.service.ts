import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";
import {configuration} from "../../../../../../environments/.env";
import {Setting} from "../settings";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class NotificationSettingService {
  serverUrl = configuration.API_BASE_URL;

  constructor(
    private _httpClient: HttpClient
  ) {}

  getNotificationSettings(): Observable<any> {
    let url = this.serverUrl + "/notificationSetting/user";
    return this._httpClient.get(url).share().catch(this.handleError);
  }

  changeNotificationSetting(
        notification: Setting
    ): Observable<any> {
      let url = this.serverUrl + "/notificationSetting";

      return this._httpClient
        .post(url, notification)
        .catch(this.handleError);
    }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
        return Observable.throw({status: error.status, text: error.error.message} || {status: error.status, text: "Server error"});
    }
    return Observable.throw(error || 'server error');
  }

}
