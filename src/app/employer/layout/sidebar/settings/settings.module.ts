import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AccordionModule} from "ng2-accordion";
import {RouterModule, Routes} from "@angular/router";
import {SettingService} from "./settings.service";
import {SecuritySettingsComponent} from "./security-settings/security-settings.component";
import {SecuritySettingService} from "./security-settings/security-settings.service";
import {UiSwitchModule} from "angular2-ui-switch";
import {EmailSettingService} from "./contact-information/emails/email.service";
import {EmailComponent} from "./contact-information/emails/email.component";
import {PhoneComponent} from "./contact-information/phones/phone.component";
import {PhoneSettingService} from "./contact-information/phones/phone.service";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ChangePasswordService} from "./change-password/change-password.service";
import {ActiveSessionsComponent} from "./active-sessions/active-sessions.component";
import {ActiveSessionService} from "./active-sessions/active-sessions.service";
import {Ng2PaginationModule} from "ng2-pagination";
import {TrustedDevicesComponent} from "./trusted-device/trusted-device.component";
import {TrustedDeviceService} from "./trusted-device/trusted-device.service";
import {NotificationSettingsComponent} from "./notification-settings/notification-settings.component";
import {NotificationSettingService} from "./notification-settings/notification-settings.service";
import { ModalModule } from 'ng2-bootstrap/modal';
import {UserProfileComponent} from "./user-profile/userProfile.component";
import {UserProfileService} from "./user-profile/userProfile.service";

const routes: Routes = [
  { path: "",
    redirectTo: "profileSetting"
  },
  {
    path: "profileSetting",
    component: UserProfileComponent,
    data: { name: "Profile Setting" }
  },
  {
    path: "securitySetting",
    component: SecuritySettingsComponent,
    data: { name: "Security Setting" }
  },
  {
    path: "notificationSetting",
    component: NotificationSettingsComponent,
    data: { name: "Notification Setting" }
  },
  {
    path: "activeSessions",
    component: ActiveSessionsComponent,
    data: { name: "Active Sessions" }
  },
  {
    path: "trustedDevices",
    component: TrustedDevicesComponent,
    data: { name: "Trusted Devices" }
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AccordionModule,
    UiSwitchModule,
    RouterModule.forChild(routes),
    Ng2PaginationModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    SecuritySettingsComponent,
    EmailComponent,
    PhoneComponent,
    ChangePasswordComponent,
    ActiveSessionsComponent,
    TrustedDevicesComponent,
    NotificationSettingsComponent,
    UserProfileComponent
  ],
  exports: [] ,
  providers: [
    SettingService,
    SecuritySettingService,
    EmailSettingService,
    PhoneSettingService,
    ChangePasswordService,
    ActiveSessionService,
    TrustedDeviceService,
    NotificationSettingService,
    UserProfileService
  ],
})
export class SettingsModule {}
