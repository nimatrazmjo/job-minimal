import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";
import {configuration} from "../../../../../environments/.env";

@Injectable()
export class SettingService {

  serverUrl = configuration.API_BASE_URL;

  constructor() {}
}