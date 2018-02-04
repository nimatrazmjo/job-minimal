import { configuration } from '../../../../../../environments/.env';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserProfileService {
  private _baseURL = configuration.API_BASE_URL;

  constructor(private _httpClient: HttpClient) {}

  updateUser(data): Observable<any> {
    let url = `${this._baseURL}/user/personalInfo`;
    return this._httpClient.patch(url, data)
      .catch(err => {
        return Observable.throw(err);
      })
  }

}
