
// import { UnsubscribeComponent } from './website/unsubscribe/unsubscribe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
//import { LoginComponent } from "./website/users/login/login.component";
//import { TwoWayAuthenticationComponent } from "./website/users/two-way-authentication/two-way-authentication.component";
//import { ProfileComponent } from "./website/users/profile/profile.component";
import { AuthGuard } from "./website/authentication/auth.guard";
//import { RegisterComponent } from './website/users/register/register.component';
//import { CompanyRegisterComponent } from "./website/users/companyRegister/companyRegister.component";
//import { SettingsComponent } from "./website/users/profile-setting/settings/settings.component";
//import { ForgetPasswordComponent } from "./website/users/forgetPassword/forget-password.component";
//import { ResetPasswordComponent } from "./website/users/forgetPassword/reset-password/reset-password.component";
// import { FeedbackComponent } from "./website/feedback/feedback.component";
//import { DownloadResumeComponent } from "./website/users/profile/download-resume/download-resume.component";
//import { TwoWayAuthGuard } from "./shared/authentication/twoWayAuth.guard";
//import { TokenGuard } from "./website/authentication/token.guard";
//import { SecureDeviceDetectionComponent } from "./website/users/secure-device-detector/secure-device-detection.component";
import { WebsiteComponent } from "./website/website.component";
import { LogoutComponent } from './shared/logout/logout.component';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/job", pathMatch: "full" },
      //{
      //  path: 'profile/:user_id',
      //  component: ProfileComponent
      //},
      //{
      //  path: 'profile/:user_id/downloadResume',
      //  component: DownloadResumeComponent
      //},
      //{
      //  path: 'profile/:user_id/profileSettings',
      //  component: SettingsComponent
      //},
      //{
      //  path: 'detect-device/:user_id',
      //  component: SecureDeviceDetectionComponent
      //},
      //{
      //  path: 'profile', loadChildren: 'app/website/users/profile/profile.module#ProfileModule'
      //},

      {
        path: 'network',
        loadChildren: 'app/website/my-network/my-network.module#MyNetworkModule'
      },
      { path: 'inbox', loadChildren: 'app/website/inbox/inbox.module#InboxModule' },
      { path: 'groups', loadChildren: 'app/website/group/group.module#GroupModule' },
      { path: "qa", loadChildren: "app/website/qa/qa.module#QaModule" },
      {
        path: "notification",
        loadChildren: "app/website/notification/notification.module#NotificationModule"
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
    ]
  },

  {
    path: 'admin',
    // canActivate: [ProtectedGuard],
    loadChildren: './admin/routes/routes.module#RoutesModule'
  },
  {
    path: 'employer',
    // canActivate: [ProtectedGuard],
    loadChildren: './employer/routes/routes.module#RoutesModule'
  },
  {
    path: 'feed',
    // canActivate: [ProtectedGuard],
    loadChildren: 'app/website/feed/feed.module#FeedModule'
  },
  {
    path: 'register',
    // canActivate: [ProtectedGuard],
    loadChildren: 'app/website/users/register/registration.module#RegistrationModule'
  },
  {
    path: 'profile',
    // canActivate: [ProtectedGuard],
    loadChildren: 'app/website/users/profile/profile.module#ProfileModule'
  },
  {
    path: 'login',
    // canActivate: [ProtectedGuard],
    loadChildren: 'app/website/users/login/login.module#LoginModule'
  },
  {
    path: 'user',
    // canActivate: [ProtectedGuard],
    loadChildren: 'app/website/users/users.module#UsersModule'
  },
  //{
  //  path: 'register',
  //  // canActivate: [PublicGuard],
  //  component: RegisterComponent
  //},
  //{
  //  path: 'company-registration',
  //  // canActivate: [PublicGuard],
  //  component: CompanyRegisterComponent
  //},
  //{
  //  path: 'login',
  //  canActivate: [PublicGuard],
  //  component: LoginComponent
  //},
  //{
  //  path: 'two-way-authentication',
  //  // canActivate: [ProtectedGuard],
  //  component: TwoWayAuthenticationComponent
  //},
  //{
  //  path: 'resendCode',
  //  // canActivate: [PublicGuard],
  //  component: TwoWayAuthenticationComponent
  //},
  //{
  //  path: ':id/password',
  //  // canActivate: [PublicGuard],
  //  component: ResetPasswordComponent
  //},
  //{
  //  path: 'forget-password',
  //  // canActivate: [PublicGuard],
  //  component: ForgetPasswordComponent,
  //
  //},
  {
    path: 'job',
    // canActivate: [PublicGuard],
    loadChildren: 'app/website/jobs/search/job-search.module#JobSearchModule'
  },
  // { path: 'jobs', loadChildren: 'app/website/jobs/jobs.module#JobsModule' },
  // { path: 'unsubscribe', component: UnsubscribeComponent },
  // { path: 'feedback', component: FeedbackComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'job' },
];

export const appRouting = RouterModule.forRoot(routes, {
  // enableTracing: true, // <-- debugging purposes only

});
