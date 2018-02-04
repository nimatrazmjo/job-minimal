import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule, Http } from "@angular/http";
import {
  TranslateService,
  TranslateModule,
  TranslateLoader,
  TranslateStaticLoader
} from "ng2-translate/ng2-translate";
import { AppComponent } from "./app.component";
// import { CoreModule } from "./admin/core/core.module";
// import { LayoutModule } from "./admin/layout/layout.module";
// import { SharedModule } from "./admin/shared/shared.module";
import { RoutesModule } from "./admin/routes/routes.module";

// import { SDKBrowserModule } from "../../../common/sdk/index";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HashLocationStrategy, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {Ng2PaginationModule} from "ng2-pagination";
import { environment } from "../environments/environment";
import { appRouting } from "./app.routes";
// import { SettingService } from "./admin/routes/settings/settings.service";
// import { SocketModule } from "./admin/shared/socket/socket.module";
import { configuration } from "../environments/.env";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { WebsiteComponent } from "./website/website.component";


// import { UnsubscribeComponent } from './website/unsubscribe/unsubscribe.component';

// import { LoginComponent } from "./website/users/login/login.component";
// import { TwoWayAuthenticationComponent } from "./website/users/two-way-authentication/two-way-authentication.component";
// import { ProfileComponent } from "./website/users/profile/profile.component";
// // import { AuthGuard } from "./website/authentication/auth.guard";
// import { RegisterComponent } from './website/users/register/register.component';
// import { CompanyRegisterComponent } from "./website/users/companyRegister/companyRegister.component";
// import { SettingsComponent } from "./website/users/profile-setting/settings/settings.component";
// import { ForgetPasswordComponent } from "./website/users/forgetPassword/forget-password.component";
// import { ResetPasswordComponent } from "./website/users/forgetPassword/reset-password/reset-password.component";
// import { FeedbackComponent } from "./website/feedback/feedback.component";
// import { DownloadResumeComponent } from "./website/users/profile/download-resume/download-resume.component";
import { TwoWayAuthGuard } from "./shared/authentication/twoWayAuth.guard";
import { TokenGuard } from "./website/authentication/token.guard";
// import { SecureDeviceDetectionComponent } from "./website/users/secure-device-detector/secure-device-detection.component";
import { FormsModule } from "@angular/forms";

// import { FeedbackModule } from "./website/feedback/feedback.module";
// import { NotificationModule } from "./website/notification/notification.module";
import { TagInputModule } from "ngx-chips";
// import { GeneralUseModule } from "./website/general-use.module";
import { AlertModule } from "ngx-bootstrap/alert/alert.module";
import Sweetalert2 from "sweetalert2";
import { SweetAlert2Module } from "@toverux/ngsweetalert2";
//import { UsersModule } from "./website/users/users.module";
//import { ProfileSettingComponent } from "./website/users/profile-setting/profile-setting.component";
import { SubscribeService } from "../../common/server-stream/subscribe.service";
import { CommonModule } from "@angular/common";
// import { NotificationComponent } from "./website/notification/notification.component";
// import { NotificationService } from "./website/notification/notification.service";
import { HttpClientModule } from "@angular/common/http";
import { AuthenticationModule } from "./shared/authentication/authentication.module";
import { LogoutComponent } from "./shared/logout/logout.component";
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Http import LoadingBarHttpModule:
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';

// for Router import LoadingBarRouterModule:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import LoadingBarModule:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { TokenService } from "./shared/authentication/token.service";
import { AuthenticationService } from "./shared/authentication/authentication.service";
import {AuthGuard} from "./website/authentication/auth.guard";


// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, "./assets/i18n", ".json");
}

const url = configuration.SOCKET_BASE_URL;

@NgModule({
  declarations: [
    AppComponent,
    // UnsubscribeComponent,
    // ProfileSettingComponent,
    WebsiteComponent,
    // NotificationComponent,
    LogoutComponent
  ],
  imports: [
    TagInputModule,
    // FeedbackModule,
    //UsersModule,
    // GeneralUseModule,
    
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AuthenticationModule,
    Ng2PaginationModule,
    BrowserAnimationsModule,
    CommonModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http],
    }),
    // SocketModule.forRoots(url),
    SweetAlert2Module.forRoot(),
    AlertModule.forRoot(),
    NgbModule.forRoot(),
    LoadingBarHttpClientModule,
    LoadingBarHttpModule,
    LoadingBarRouterModule,
    LoadingBarModule.forRoot(),
    appRouting,
  ],
  providers: [
    { provide: LocationStrategy, useClass: environment.production ? HashLocationStrategy : PathLocationStrategy }, 
    SubscribeService,
    ToastrService,
    // NotificationService,
    TokenService,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
