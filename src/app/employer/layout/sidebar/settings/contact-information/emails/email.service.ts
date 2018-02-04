import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";
import {Email} from "./email";
import {configuration} from "../../../../../../../environments/.env";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class EmailSettingService {
  serverUrl = configuration.API_BASE_URL;

  constructor(private _httpClient: HttpClient) {}

  addEmail(email: Email): Observable<Email> {
    let url = this.serverUrl + "/user/email";
    return this._httpClient
      .post(url, email)
      .share()
      .catch(this.handleError);
  }

  addPrimaryEmailToContacts(email: Email): Observable<Email> {
    let url = this.serverUrl + "/user/addEmailToContacts";
    return this._httpClient
      .post(url, email)
      .share()
      .catch(this.handleError);
  }

  deleteEmail(email_id: string): Observable<Email> {
    let url = this.serverUrl + "/user/email/" + email_id;
    return this._httpClient
      .delete(url)
      .share()
      .catch(this.handleError);
  }

  getEmails(): Observable<Email[]> {
    let url = this.serverUrl + "/user/email";
    return this._httpClient
      .get(url)
      .share()
      .catch(this.handleError);
  }

  getOneEmail(email_id: string): Observable<Email> {
    let url = this.serverUrl + "/user/email/" + email_id;
    return this._httpClient
      .get(url)
      .share()
      .catch(this.handleError);
  }

  changePrimaryEmail(emailId, email: any): Observable<Email> {
    let url = this.serverUrl + "/user/changeEmail/"+ emailId;
    return this._httpClient
      .patch(url, email)
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