import { AuthorizedHttp } from './../../routes/authentication/authorizedHttp.service';
import { configuration } from './../../../../environments/.env';
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Token } from './../../routes/authentication/token.model';
import { TokenService } from '../../routes/authentication/token.service';

@Injectable()
export class LiveChatService {
  BASE_URL = configuration.API_BASE_URL;
  API_VERSION = configuration.API_VERSION;
  token: Token;

  constructor(
    private http: AuthorizedHttp,
    private tokenService: TokenService
  ) {
    this.token = this.tokenService.getToken();
  }

  createLiveChat(data): Observable<any> {
    let url  = this.BASE_URL + '/liveChat';
    
    return this.http.post(url, data)
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }

  getLiveChat(liveChatId: string): Observable<any> {
    let url  = this.BASE_URL + '/liveChat/' + liveChatId;
    
    return this.http.get(url)
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }

  getLiveChats(queryFilter: string): Observable<any[]> {
    let url  = this.BASE_URL + '/liveChat?filter=' + queryFilter;
    
    return this.http.get(url)
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }

  deleteLiveChat(liveChatId: string): Observable<any> {
    let url = this.BASE_URL + '/liveChat/' + liveChatId;
    return this.http.delete(url)
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }

  createMessage(liveChatId: string ,messageData: any): Observable<any> {
    let url = this.BASE_URL + '/liveChat/' + liveChatId + '/message';
    return this.http.post(url, messageData)
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }

  updateSeenByMembers(data): Observable<any>{
    return this.http.put(this.BASE_URL + '/liveChat/message/updateSeenMembers', data)
    .map(res => res.json())
    .catch(error => this.handleError(error));
  }

  private handleError(error: Response) {
    return Observable.throw(error || "Server error");
  }
}
