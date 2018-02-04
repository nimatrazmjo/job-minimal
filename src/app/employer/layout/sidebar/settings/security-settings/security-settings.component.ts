import { Component, OnInit } from "@angular/core";
import {SecuritySettingService} from "./security-settings.service";
import {EmployerDataProvider} from "../../../provider/employerDataProvider";
import {SharedService} from "../../../../shared/shared.service";
import {ToastrService} from "ngx-toastr";
import swal from "sweetalert2";

@Component({
  selector: "security-settings",
  templateUrl: "security-settings.component.html",
  styleUrls: ["../settings.component.css"]
})
export class SecuritySettingsComponent implements OnInit {
  showProfile: boolean;
  constructor(private securitySettingService: SecuritySettingService,
              private _employerDataProvider: EmployerDataProvider, private _sharedService: SharedService, private _toastr: ToastrService) {}
  ngOnInit() {
    this.showProfile = false;
  }
  onAuthChange(event, userId: string) {
    (window as any).swal(
      {
        title: "Are you sure?",
        text: "",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, Change it!",
        closeOnConfirm: false
      },
      (confirmed) => {
        if (confirmed) {
          let twoWayAuth;
          if (event === true) {
            twoWayAuth = {
              twoWayAutEnabled: true
            };
          }
          else {
            twoWayAuth = {
              twoWayAutEnabled: false
            };
          }
          this.securitySettingService.changeTwoWayAuth(twoWayAuth, userId).subscribe(
            res => {
              (window as any).swal("Changed!", "", "success");
              setTimeout(function () {
                (window as any).location.href = (window as any).location.href;
              }, 1000);
            },
            err => {
              (window as any).swal("Something went wrong", "", "error");
            }
          );
        }
        else {
          if (event === true) {
            this._employerDataProvider.storage.authUser.twoWayAutEnabled = false;
          }
          else {
            this._employerDataProvider.storage.authUser.twoWayAutEnabled = true;
          }
        }
      }
    ), err => {
      if (err.status === 401) {
        swal({type: 'info', title: '', text: JSON.parse(err._body).message, showConfirmButton: true}).then((isConfirmed) => {
          if (isConfirmed.value) {
            this._sharedService.logout();
          }
        }).catch(swal.noop);
      } else {
        this._toastr.error(JSON.parse(err._body).message, "Error!", {progressBar: true, closeButton: true});
      }
    };
  }

}
