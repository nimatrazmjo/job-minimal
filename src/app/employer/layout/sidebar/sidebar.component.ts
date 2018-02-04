import {Component} from '@angular/core';
import {Router} from '@angular/router';

declare var $: any;
import {MenuService} from '../../core/menu/menu.service';
import { configuration } from '../../../../environments/.env';
import { environment } from '../../../../environments/environment';
import {ActiveSessionService} from "./settings/active-sessions/active-sessions.service";
import {Token} from "../../routes/authentication/token.model";
import {TokenService} from "../../routes/authentication/token.service";
import {SharedService} from "../../shared/shared.service";
import {EmployerDataProvider} from "../provider/employerDataProvider";
import {Location} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ActiveSessionService]
})
export class SidebarComponent
// implements OnInit, AfterViewInit 
{
  menuItems: Array<any>;
  // router: Router;
  user;
  userId: string;
  profileImageSrc;

  private companyName;
  // private sharedService = this._sharedService;
  isVerified: boolean = true;
  memberDetailsInCompany;
  companyOwner;
  companyVerification;
  environment = environment;
  menus: Array<any> = [];
  collapseStatus: Array<Boolean> = [];
  subMenuStatus: Array<Boolean> = [];
  token: Token;
  userData = {};
  
  accountSettingsMenuStatus: boolean = false;
  socketUrl = configuration.SOCKET_BASE_URL;

  constructor(private menu: MenuService,
              private router: Router,
              private _sharedService: SharedService,
              private activeSessionService: ActiveSessionService,
              private tokenService: TokenService,
              private _employerDataProvider: EmployerDataProvider,
              private _location: Location
  ) {
    this.token = this.tokenService.getToken();
    
    this.menuItems = menu.getMenu();
    this.userId = this.token.getCurrentUserId();
    var currentMenu = this._location.path().split("/");
    if (currentMenu.length > 1) {
      this.collapseStatus[currentMenu[1]] = true;
      this.subMenuStatus[this._location.path()] = true;
    }
  }

  ngOnInit() {
    this.companyName =  this._employerDataProvider.storage.company.name;
    this.getProfilePic();
    this.getMenusByUserRole();
  }


  getProfilePic() {
    if (this._employerDataProvider.storage.authUser.profilePic) {
      this.profileImageSrc =
        "/uploadedFiles/profPics/download/profile_cropped_" +
        this._employerDataProvider.storage.authUser.name;
    }
    else {
      this.profileImageSrc = "assets/images/profile.png";
    }
  }

  getMenusByUserRole() {
    var employerData = this._employerDataProvider.storage;
    if (this._employerDataProvider.storage.company && employerData.company.owner.id === this._employerDataProvider.storage.authUser._id) {
      this.menus = this.menuItems;
    } else {
      var members = this._employerDataProvider.storage.company.members ? this._employerDataProvider.storage.company.members : '';
      var memberDetails = members.find(member => member.userId == this._employerDataProvider.storage.authUser._id);

      for (var m = 0; m < this.menuItems.length; m++) {
        if (
            (this.menuItems[m].teamMemberPermissionRequired == 'canPostJob' && memberDetails != '' && memberDetails.canPostJob)
            ||
            (this.menuItems[m].teamMemberPermissionRequired == 'canSearchResume' && memberDetails != '' && memberDetails.canSearchResume)
            ||
            (this.menuItems[m].teamMemberPermissionRequired == 'canPostRFQ' && memberDetails != '' && memberDetails.canPostRFQ)
            ||
            (this.menuItems[m].teamMemberPermissionRequired == 'canPostTraining' && memberDetails != '' && memberDetails.canPostTraining)
            ||
            this.menuItems[m].teamMemberPermissionRequired == ''
        ) {
          this.menus.push(this.menuItems[m]);
        }
      }
    }
  }

  menuClick(clickedItem: string, defaultSubMenu: string): void {
    this.accountSettingsMenuStatus = false;
    this.subMenuStatus = [];
    this.subMenuStatus[defaultSubMenu] = true;
    var currentElementStatus = this.collapseStatus[clickedItem];

    this.collapseStatus = [];
    this.collapseStatus[clickedItem] = currentElementStatus;
    if (!this.collapseStatus[clickedItem]) {
      this.collapseStatus[clickedItem] = true;
    } else {
      this.collapseStatus[clickedItem] = false;
    }

  }

  subMenuClick(menu: string, subMenu): void {
    this.collapseStatus = [];
    this.collapseStatus[menu] = true;

    var currentSubMenu = this.subMenuStatus[subMenu];
    this.subMenuStatus = [];
    this.subMenuStatus[subMenu] = currentSubMenu;
    this.subMenuStatus[subMenu] = true;
  }

  collapseAllOtherMenus() {
    this.accountSettingsMenuStatus = !this.accountSettingsMenuStatus;
    this.collapseStatus = !this.accountSettingsMenuStatus ? this.collapseStatus : [];
    this.subMenuStatus = !this.accountSettingsMenuStatus ? this.subMenuStatus : [];
  }

  ngAfterViewInit(): void {
    $('#side-menu').metisMenu();
    $('#side-menu').css('visibility', 'visible');
  }
}

