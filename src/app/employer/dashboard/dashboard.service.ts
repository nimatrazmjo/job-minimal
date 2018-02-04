import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configuration } from './../../../environments/.env';

@Injectable()
export class DashboardService {
  private baseUrl = configuration.API_BASE_URL;

  constructor(private http: HttpClient) { }

  getTotalJobs(): Promise<any>{
    return new Promise<any> ((resolve, reject) => {
      this.http.get(this.baseUrl + '/jobs/count')
      .subscribe(jobs => {
        resolve(jobs);
      }, error => {
        reject(error);
      })
    });
    
  }

}