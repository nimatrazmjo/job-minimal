/**
 * Created by mobasherfasihy on 1/29/2018 AD.
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadcrumbUrlFriendlyName } from "./breadcrumb/breadcrumbUrlFreindlyName.pipe";

@NgModule({
  declarations: [
    BreadcrumbUrlFriendlyName
  ],
  imports: [CommonModule],
  exports: [
    BreadcrumbUrlFriendlyName
  ]
})
export class SharedPipeModule {}

