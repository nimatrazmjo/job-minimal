import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";
import {configuration} from "../../../../../../environments/.env";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TrustedDeviceService {
  serverUrl = configuration.API_BASE_URL;

  constructor(
    private _httpClient: HttpClient
  ) {}

  getTrustedDevices(page: number, perPage: number): Observable<any[]> {
    const start: number = (page - 1) * perPage;
    let filterStr: string = `{"limit": ${perPage}, "skip": ${start}}`;
    let url = `${this.serverUrl}/secureDevices?filter=${filterStr}`;
    return this._httpClient
      .get(url)
      .share()
      .catch(this.handleError);
  }


  removeDevice(device_id: string): Observable<any> {
    let url = this.serverUrl + "/secureDevices/" + device_id;
    return this._httpClient
      .delete(url)
      .share()
      .catch(this.handleError);
  }

  removeAllDevices(): Observable<any> {
    let url = this.serverUrl + "/user/secureDevices/removeAllDevices";
    return this._httpClient
      .delete(url)
      .share()
      .catch(this.handleError);
  }

  getDevicesCount(): Observable<number> {
    let url = `${this.serverUrl}/secureDevices/secureDevicesCount`;
    return this._httpClient
      .get(url)
      .share()
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
