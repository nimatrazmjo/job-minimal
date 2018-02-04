
import { Component, HostBinding, OnInit } from "@angular/core";
import { SettingsService } from "./shared/settings/settings.service";
import { TranslateService } from "ng2-translate";
// import { LoopBackConfig } from "../../../common/sdk";
import { configuration } from "../environments/.env";
// import { SubscribeService } from "../../../common/server-stream/stream";
// import { AuthService } from "../../../client/app/users/auth.service";
import * as url from "url";
import * as $ from 'jquery';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [SettingsService]
})
export class AppComponent implements OnInit {
  @HostBinding("class.layout-fixed")
  get isFixed() {
    return this.settings.layout.isFixed;
  }
  @HostBinding("class.aside-collapsed")
  get isCollapsed() {
    return this.settings.layout.isCollapsed;
  }
  @HostBinding("class.layout-boxed")
  get isBoxed() {
    return this.settings.layout.isBoxed;
  }
  @HostBinding("class.layout-fs")
  get useFullLayout() {
    return this.settings.layout.useFullLayout;
  }
  @HostBinding("class.hidden-footer")
  get hiddenFooter() {
    return this.settings.layout.hiddenFooter;
  }
  @HostBinding("class.layout-h")
  get horizontal() {
    return this.settings.layout.horizontal;
  }
  @HostBinding("class.aside-float")
  get isFloat() {
    return this.settings.layout.isFloat;
  }
  @HostBinding("class.offsidebar-open")
  get offsidebarOpen() {
    return this.settings.layout.offsidebarOpen;
  }
  @HostBinding("class.aside-toggled")
  get asideToggled() {
    return this.settings.layout.asideToggled;
  }
  @HostBinding("class.aside-collapsed-text")
  get isCollapsedText() {
    return this.settings.layout.isCollapsedText;
  }

  constructor(
    public settings: SettingsService,
    private translate: TranslateService,
    // private socket: SocketService
  ) {
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang("en");
  }

  ngOnInit() {}
}
