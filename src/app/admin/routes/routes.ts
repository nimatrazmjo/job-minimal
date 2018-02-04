import { CompanyListComponent } from './company/company-list/company-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutComponent } from "../layout/layout.component";


import { RecoverComponent } from "./pages/recover/recover.component";
import { LockComponent } from "./pages/lock/lock.component";
import { MaintenanceComponent } from "./pages/maintenance/maintenance.component";
import { AuthenticationGuard } from "./authentication/authentication-guard";
import {SettingComponent} from "./settings/settings.component";
import {GeneralSearchComponent} from "./general-search/general-search.component";
import {ShowSearchResultComponent} from "./general-search/show-search-result/show-search-result.component";
import { Injectable } from "@angular/core";

import { AllExchangeRateComponent } from './exchange-rate/all-exchange-rate.component';
import { Token } from '../../shared/authentication/token.model';
import { TokenService } from '../../shared/authentication/token.service';
import {Error404Component} from "../../shared/error-handler/error404/error404.component";
import {Error500Component} from "../../shared/error-handler/error500/error500.component";

@Injectable()
export class IsLoggedIn {
  token: Token
  private returnUrl;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService) {
      this.token = this.tokenService.getToken();
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/user";
  }

  resolve(): void {
    if (this.token && !this.token.isExpired()) {
      this.router.navigate([`${this.returnUrl}`]);
    }
  }
}


export const routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: "", redirectTo: "user", pathMatch: "full" },
      {
        path: "user",
        data: { name: "Users" },
        loadChildren: "./user/user.module#UsersModule"
      },
      {
        path: "packages",
        data: { name: "Packages" },
        loadChildren: "./package/package.module#PackageModule"
      },
      {
        path: "invoice",
        loadChildren: "./invoice/invoice.module#InvoiceModule"
      },
      {
        path: "jobs",
        data: { name: "Jobs" },
        loadChildren: "./jobs/jobs.module#JobsModule"
      },
      {
        path: "reported-items",
        data: { name: "Reported Resources" },
        loadChildren:
          "./reported-resources/reported-resources.module#ReportedResourcesModule"
      },
      {
        path: "statistic",
        data: { name: "Reporting" },
        loadChildren: "./reporting/reporting.module#ReportingModule"
      },
      {
        path: "ads",
        data: { name: "Ads" },
        loadChildren: "./ads/ads.module#AdsModule"
      },
      {
        path: "session",
        data: { name: "Sessions" },
        loadChildren: "./session/session.module#SessionModule"
      },
      {
        path: "inbox",
        data: { name: "Inbox" },
        loadChildren: "./inbox/inbox.module#InboxModule"
      },
      {
        path: "master-data/unapproved",
        data: { name: "Unapproved" },
        loadChildren: "./master-data/unapproved/unapproved.module#UnapprovedModule"
      },
      {
        path: "master-data/approved",
        data: { name: "Approved" },
        loadChildren: "./master-data/approved/approved.module#ApprovedModule"
      },
      {
        path: "profile-verification-request",
        data: { name: "Profile Verification Request" },
        loadChildren:
          "./profile-verification-request/profile-verification-request.module#ProfileVerificationRequestModule"
      },
      {
        path: "settings",
        data: { name: "Settings" },
        loadChildren: "./settings/settings.module#SettingModule",
        component: SettingComponent
      },
      {
        path: "general-search",
        data: { name: "General Search" },
        loadChildren: "./general-search/general-search.module#GeneralSearchModule",
        component: GeneralSearchComponent
      },
      {
        path: "feedbacks",
        data: { name: "Feedbacks" },
        loadChildren: "./feedbacks/feedback.module#FeedbackModule"
      },
      {
        path: "bank-accounts",
        data: { name: "Bank Accounts" },
        loadChildren: "./bank-accounts/bank-account.module#BankAccountModule"
      },
      {
        path: "statements",
        data: { name: "Company Statements" },
        loadChildren: "./company-statement/company-statement.module#CompanyStatementModule"
      },
      {
        path: 'exchange-rate',
        data: { name: "Exchange Rate" },
        component: AllExchangeRateComponent
      },
      {
        path: "search-result",
        component: ShowSearchResultComponent,
        data: { name: "Search Result View" }
      },
      {
        path: "companies",
        data: { name: "Active Company" },
        loadChildren: "./company/company.module#CompanyModule"
      },
    ]
  },

  // Not lazy-loaded routes
  // { path: "login", component: LoginComponent, resolve: [IsLoggedIn] },

  { path: "recover", component: RecoverComponent },
  { path: "lock", component: LockComponent },
  { path: "maintenance", component: MaintenanceComponent },
  { path: "500", component: Error500Component },
  { path: "**", component: Error404Component }

];
