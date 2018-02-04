import { UserDetailsPipe } from './live-chat/user-details.pipe';
import { LiveChatComponent } from './live-chat/live-chat.component';
import { NgModule } from "@angular/core";

import { LayoutComponent } from "./layout.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { NavsearchComponent } from "./header/navsearch/navsearch.component";
import { FooterComponent } from "./footer/footer.component";
import { SharedModule } from "../shared/shared.module";
import { rightSidebarComponent } from './right-sidebar/right-sidebar.component'
import {SettingComponent} from "./sidebar/settings/settings.component"
import {SettingsModule} from "./sidebar/settings/settings.module";
import {SettingService} from "./sidebar/settings/settings.service";
import {UserProfileService} from "./sidebar/settings/user-profile/userProfile.service";
import { DashboardComponent } from '../dashboard/dashboard.component';
import {SubscriptionComponent} from "../routes/subscriptions/subscription.component";
import { DashboardService } from '../dashboard/dashboard.service';

@NgModule({
  imports: [
    SharedModule.forRoot()
  ],
  providers: [
    UserProfileService,
    SettingService,
    DashboardService
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    NavsearchComponent,
    FooterComponent,
    rightSidebarComponent,
    SettingComponent,
    LiveChatComponent,
    UserDetailsPipe,
    DashboardComponent,
    SubscriptionComponent
  ],
  exports: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    NavsearchComponent,
    FooterComponent,
    rightSidebarComponent
  ]
})
export class LayoutModule {}
