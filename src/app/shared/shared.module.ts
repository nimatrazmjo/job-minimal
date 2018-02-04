import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { LogoutComponent } from './logout/logout.component';
import { SharedPipeModule } from "./shared-pipe.module";
import {SettingsService} from "./settings/settings.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    //LogoutComponent,
    SharedPipeModule,
  ],
  providers: [
    SettingsService
  ]
})
export class SharedModule { }
