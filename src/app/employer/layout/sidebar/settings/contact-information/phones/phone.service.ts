import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";
import {Phone} from "./phone";
import {configuration} from "../../../../../../../environments/.env";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class PhoneSettingService {
  serverUrl = configuration.API_BASE_URL;

  constructor(
    private _httpClient: HttpClient
  ) {}

  deletePhone(phone_id: string): Observable<Phone> {
    let url = this.serverUrl + "/user/phone/" + phone_id;
    return this._httpClient
      .delete(url)
      .share()
      .catch(this.handleError);
  }

  getPhones(): Observable<Phone[]> {
    let url = this.serverUrl + "/user/phone";
    return this._httpClient
      .get(url)
      .share()
      .catch(this.handleError);
  }

  addPhone(phone: Phone): Observable<Phone> {
    let url = this.serverUrl + "/user/phone";
    return this._httpClient
      .post(url, phone)
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
