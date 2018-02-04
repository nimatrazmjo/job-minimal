import { Component, OnInit } from "@angular/core";
import {Setting} from "../settings";
import {NotificationSettingService} from "./notification-settings.service";
import {User} from "../user";
import {SharedService} from "../../../../shared/shared.service";
import {EmployerDataProvider} from "../../../provider/employerDataProvider";
import swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "notification-settings",
  templateUrl: "notification-settings.component.html",
  styleUrls: ["../settings.component.css"]
})
export class NotificationSettingsComponent implements OnInit {
  user: User = new User();

  notificationSettings: any;
  notificationTypes = [];


  constructor(
    private notificationSettingService: NotificationSettingService,
    private _sharedService: SharedService,
    private _employerDataService: EmployerDataProvider,
    private _toastr: ToastrService
    ) {}

  async ngOnInit() {

    this.user = this._employerDataService.storage.authUser;

    this.notificationSettings = await this.getNotificationSettings().then(result => {return result}, err => {});

    for (let ns in this.notificationSettings) {
      for (let type in this.notificationSettings[ns].types) {
        this.notificationTypes[this.notificationSettings[ns].types[type].name] = false;
        this.notificationTypes[this.notificationSettings[ns].types[type].name] = this.notificationSettings[ns].types[type].status;
      }
    }
  }

  getNotificationSettings(): Promise<any> {
    return new Promise((resolve, reject)=> {
      this.notificationSettingService.getNotificationSettings().subscribe(result => {
        this.notificationSettings = result;
        resolve(this.notificationSettings);
      }, err => {

        console.log(err);
        if (err.status === 401) {
          swal({type: 'info', title: '', text: JSON.parse(err._body).message, showConfirmButton: true}).then((isConfirmed) => {
            if (isConfirmed.value) {
              this._sharedService.logout();
            }
          }).catch(swal.noop);
        } else {
          this._toastr.error(JSON.parse(err._body).message, "Error!", {progressBar: true, closeButton: true});
        }
        reject();
      });
    });
  };

  changeStatus(event, type: string): void {
    (window as any).swal(
      {
        title: "Are you sure you want to change it?",
        text: "",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, Change it!",
        closeOnConfirm: true
      },
      (confirmed) => {
        if (confirmed) {
          const info = {
            type: type,
            status: event
          };
          this.notificationSettingService.changeNotificationSetting(info).subscribe(result => {
            this._toastr.success(result.message, 'Success!', {progressBar: true, closeButton: true})
            return;
          }, err => {
            this._toastr.error(err.text, 'Error', {progressBar: true, closeButton: true});
          });
        }
        else {
          if (event) {
            this.notificationTypes[type] = false;
          }
          else {
            this.notificationTypes[type] = true;
          }
        }
      });
  }

  successMessage(): void {
    setTimeout(() => {
      (window as any).swal({
        title: 'Congratulations!',
        text: 'Changed successfully!',
        type: 'success',
        timer: 1000
      });
    }, 1000);
  }

  errorMessage(): void {
    setTimeout(() => {
      (window as any).swal({
        title: 'Opps!',
        text: 'Something went wrong!',
        type: 'error',
        timer: 1000
      });
    }, 1000);
  }

}
