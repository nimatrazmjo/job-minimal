import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UserProfileService} from "./userProfile.service";
import {EmployerDataProvider} from "../../../provider/employerDataProvider";
import swal from "sweetalert2";
import {SharedService} from "../../../../shared/shared.service";

@Component({
  selector: 'app-userProfile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;
  firstName;
  lastName;
  validationErrors = [];
  formLoading = false;

  constructor(
    private _userProfileService: UserProfileService,
    private toastr: ToastrService,
    private _sharedService: SharedService,
    private _employerDataProvider: EmployerDataProvider) {}

  ngOnInit() {
    this.firstName = this._employerDataProvider.storage.authUser.firstName;
    this.lastName = this._employerDataProvider.storage.authUser.lastName;
  }

  displayModal(modal) {
    modal.show();
  }

  onUpdate(form, modal ) {
    let formData = form.value;

    this.formLoading = true;
    this._userProfileService.updateUser(formData).subscribe(updatedResult => {
      this._employerDataProvider.storage.authUser.firstName = updatedResult.firstName;
      this._employerDataProvider.storage.authUser.lastName = updatedResult.lastName;
      this.validationErrors = [];
      this.toastr.success('Record updated successfully!', 'Success!', {progressBar: true, closeButton: true});
      document.body.scrollTop = 0;
      modal.hide();
      this.formLoading = false;
    }, err => {
      if (err.status === 422) {
        this.validationErrors = [];
        var validationError = JSON.parse(err._body);
        for(var e = 0; e < validationError.message.length; e++) {
          this.validationErrors[validationError.message[e].path] = "";
          this.validationErrors[validationError.message[e].path] = validationError.message[e].message;
        }
        this.formLoading = false;
      } if (err.status === 401) {
        this.formLoading = false;
        swal({type: 'info', title: '', text: JSON.parse(err._body).message, showConfirmButton: true}).then((isConfirmed) => {
          if (isConfirmed.value) {
            this._sharedService.logout();
          }
        }).catch(swal.noop);
      } else {
        this.formLoading = false;
        this.toastr.error(JSON.parse(err._body).message, 'Error!', {progressBar: true, closeButton: true});
      }
    });
  }

  closeModal(modal) {
    this.validationErrors = [];
    modal.hide();
  }

}
