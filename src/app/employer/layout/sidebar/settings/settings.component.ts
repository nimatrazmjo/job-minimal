import { Component, OnInit } from "@angular/core";
import {TokenService} from "../../../routes/authentication/token.service";
import {Token} from "../../../routes/authentication/token.model";
import {SharedService} from "../../../shared/shared.service";
import {EmployerDataProvider} from "../../provider/employerDataProvider";


@Component({
  selector: "settings",
  templateUrl: "settings.component.html",
  styleUrls: ["settings.component.css"]
})
export class SettingComponent implements OnInit {

  profileImageSrc;
  coverPicSrc;
  constructor(private _employerDataProvider: EmployerDataProvider ) {

  }

  ngOnInit() {
    this.getProfilePic();
    this.getCoverPic();
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

  getCoverPic() {
    if (this._employerDataProvider.storage.authUser.profilePic) {
      this.coverPicSrc =
        "/uploadedFiles/profPics/download/profile_cropped_" +
        this._employerDataProvider.storage.authUser.name;
    }
    else {
      this.coverPicSrc = "assets/images/profile.png";
    }
  }


}
