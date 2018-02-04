import {Component, ViewContainerRef} from "@angular/core";
import { SubscribeService } from "../../../common/server-stream/stream";
// import { AuthService } from "./users/auth.service";
import { TranslateService } from "ng2-translate/index";
import { Router, NavigationEnd } from "@angular/router";
import {TokenService} from "./../shared/authentication/token.service";

import {ToastsManager} from "ng2-toastr";
import { AuthenticationService } from "../shared/authentication/authentication.service";
// import {JobsUserApi} from "../../common/sdk/services/custom/JobsUser";

let url = require("url");
@Component({
  selector: "website-root",
  templateUrl: "./website.component.html",
  styleUrls: ["./website.component.css"]
})
export class WebsiteComponent {
  title = "app works!";
  authUser: any;
  session: any;
  userId: string;

  public viewContainerRef: ViewContainerRef;


  constructor(
    // private authService: AuthService,
    private translate: TranslateService,
    private subscribe: SubscribeService,
    private _router: Router,
    private tokenService: TokenService,
    private authenticationService: AuthenticationService,
    public toastr: ToastsManager,
    viewContainerRef: ViewContainerRef
  ) {
    this.viewContainerRef = viewContainerRef;
    this.toastr.setRootViewContainerRef(viewContainerRef);
    if (this.authUser) {
      // this.subscribe.subscribe([userid+'/chat']);
    }
    // if(this.userId){
    //
    // }

    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang("en");
  }

  ngOnInit() {
    this._router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };

    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this._router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
    // this.isSessionBlocked();
  }
  isUserAuthenticated() {
    this.authUser = this.tokenService.getCurrentUser();
    if (this.authUser) return true; else return false;
  }

  // isSessionBlocked () {
  //   this.userId = this.tokenService.getCurrentUserId();
  //   if (this.userId) {
  //     this.authenticationService.getLatestSession().subscribe(sessRes =>{
  //       this.session = sessRes[0].blocked;
  //       if(this.session)return true; else return false;
  //     });
  //     // return false;
  //   }
  //   else {
  //     return true;
  //   }
  //
  //   //    else
  //   // console.log(this.userId, 'hjghfjghfjghhg');
  //   // this.authenticationService.getLatestSession(this.userId).subscribe(sessRes =>{
  //   //   this.session = sessRes[0].blocked;
  //   //   if(this.session)return true; else return false;
  //   // })
  // }
  
  navigateMenus(e) {}
}
