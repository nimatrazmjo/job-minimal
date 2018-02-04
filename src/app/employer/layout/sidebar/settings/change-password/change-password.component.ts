import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangePasswordService} from "./change-password.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "change-password",
  templateUrl: "change-password.component.html",
  styleUrls: ["change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  changePasswordForm: FormGroup;
  validationErrors = [];

  formLoading = false;

  constructor(private changePasswordService: ChangePasswordService, private _toastr: ToastrService) {}

  ngOnInit() {
    this.formControl();
  }

  formControl() {
    this.oldPassword = new FormControl("", Validators.required);
    this.password = new FormControl("", Validators.required);
    this.confirmPassword = new FormControl("", Validators.required);
    this.changePasswordForm = new FormGroup({
      oldPassword: this.oldPassword,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  UpdatePassword() {

    this.formLoading = true;
    this.changePasswordService.changePassword(this.changePasswordForm.value).subscribe(
      res => {
        this._toastr.success("Password changed successfully", "Success!", {progressBar: true, closeButton: true})
        this.changePasswordForm.reset();
        this.validationErrors = [];
        this.formLoading = false;
        return;
      },
      err => {
        if (err.status === 422) {
            this.formLoading = false;
            this.validationErrors = [];
            var validationError = err;
            for(var e = 0; e < validationError.text.length; e++) {
                this.validationErrors[validationError.text[e].path] = "";
                this.validationErrors[validationError.text[e].path] =  validationError.text[e].message;
            }
        } else {
          this.formLoading = false;
          this._toastr.error(err.text, "Error!", {progressBar: true, closeButton: true});
          return;
        }
      }
    );
  }

}
