import { Component, OnInit } from "@angular/core";
import { EmployerDataProvider } from "./provider/employerDataProvider";
import { SharedService } from "../shared/shared.service";
import swal from "sweetalert2";
import {Router} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  user: any;
  exceptionalRoutes = ['/settings/profileSetting'];
  currentRoute = '';

  constructor(
      private _employerDataProvider: EmployerDataProvider,
      private _sharedService: SharedService,
      private router: Router,
      private _toastr: ToastrService,
      private _location: Location,
  ) {}

  async ngOnInit() {
    await this.getAuthUser();
    await this.getCompanyByUserId();
    this.currentRoute = this._location.path();
  }

  getAuthUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._sharedService.getAuthUser().subscribe(user => {
        this._employerDataProvider.storage.authUser = user;
        resolve();
      }, err => {
        if (err.status === 423) {
        }else if (err.status == 401) {
          swal({type: 'info', title:'' , text: err.text, showConfirmButton: true});
          this._sharedService.logout();
        }else {
          this._toastr.error(err.text, "Error!", {progressBar: true, closeButton: true});
        }
        reject();
      })
    });
  };

  getCompanyByUserId(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._sharedService.getUserCompany().subscribe(company => {
        this._employerDataProvider.storage.company =  company;
        this._employerDataProvider.storage.companyNotVerifiedMsg =  company.status === 1 ? '' : 'Your company is not verified';
        resolve();
      }, err => {
        if (err.status === 423) {
        }else if (JSON.parse(err._body).status == 401) {
          swal({type: 'info', title: '', text: err.text, showConfirmButton: true});
          this._sharedService.logout();
        } else {
          this._toastr.error(err.text, "Error!", {progressBar: true, closeButton: true});
        }
        reject();
      });
    });
  };

}