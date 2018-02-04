/**
 * Created by mobasherfasihy on 1/3/2018 AD.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class EmployerDataProvider {

    public storage: any = {
      company: {},
      authUser: {},
      companyNotVerifiedMsg: "",
      companyCreditMessage: ''
    };
    
    public constructor() { }

    public getData() {
       return this.storage;
    }

}