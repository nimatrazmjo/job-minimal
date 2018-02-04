import { Component, OnInit } from "@angular/core";
import {User} from "../user";
import {Token} from "../../../../routes/authentication/token.model";
import {configuration} from "../../../../../../environments/.env";
import {TokenService} from "../../../../routes/authentication/token.service";
import {TrustedDeviceService} from "./trusted-device.service";
import {SharedService} from "../../../../shared/shared.service";
import {ToastrService} from "ngx-toastr";
import swal from "sweetalert2";

@Component({
  selector: "trusted-devices",
  templateUrl: "trusted-device.component.html",
  styleUrls: ["../settings.component.css"]
})
export class TrustedDevicesComponent implements OnInit {
  user: User;
  logged_in_user_id: string;
  userTrustedDevices;
  userToken: Token;
  p: number = 0;
  perPage = configuration.PER_PAGE;
  total: number;
  page: number = 1;

  constructor(private tokenService: TokenService,
              private trustedDeviceService: TrustedDeviceService,
              private _toastr: ToastrService,
              private _sharedService: SharedService
  ) {
    this.userToken = tokenService.getToken();
  }

  ngOnInit() {
    this.logged_in_user_id = this.userToken.getCurrentUserId();
    this.loadData();
  }


  loadData() {
    this.getUserTrustedDevices(this.page);
  }

  getUserTrustedDevices(page: number): void {
    this.trustedDeviceService.getTrustedDevices(page, this.perPage).subscribe(res => {
      this.userTrustedDevices = res;
      this.p = page;
    }, err => {
      if (err.status === 401) {
        swal({type: 'info', title: '', text: JSON.parse(err._body).message, showConfirmButton: true}).then((isConfirmed) => {
          if (isConfirmed.value) {
            this._sharedService.logout();
          }
        }).catch(swal.noop);
      } else {
        this._toastr.error(JSON.parse(err._body).message, "Error!", {progressBar: true, closeButton: true});
      }
    });
    this.getDevicesCount();
  }

  getDevicesCount(): void {
    this.trustedDeviceService
      .getDevicesCount()
      .subscribe(count => (this.total = count));
  }

  removeDevice(deviceId: string): void {
    (window as any).swal(
      {
        title: "Are you sure you want to remove this device?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Remove it!",
        confirmButtonClass: "btn-danger",
        closeOnConfirm: true
      },
      () => {
        this.trustedDeviceService.removeDevice(deviceId).subscribe(res => {
            this._toastr.success("Device removed successfully", "Success!", {progressBar: true, closeButton: true});
            this.loadData();
            return;
          },
          err => {
            this._toastr.error(JSON.parse(err._body).message, "Error!", { progressBar: true, closeButton: true });
            return;
          }
        );
      }
    );
  }

  removeAllDevices(): void {
    (window as any).swal(
      {
        title: "Are you sure you want to remove all devices?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Remove!",
        confirmButtonClass: "btn-danger",
        closeOnConfirm: true
      },
      () => {
        this.trustedDeviceService.removeAllDevices().subscribe(res => {
            // this._toastr.success("", this.translate.instant("global.remove_device"));
            this._toastr.success("All devices removed successfully", "Success!", {progressBar: true, closeButton: true});

            this.loadData();
            return;
          },
          err => {
            this._toastr.error(JSON.parse(err._body).message, "Error!", { progressBar: true, closeButton: true });
            return;
          }
        );
      }
    );
  }
}
