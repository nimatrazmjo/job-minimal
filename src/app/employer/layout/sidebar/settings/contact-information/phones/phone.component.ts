import { Component, OnInit } from "@angular/core";
import {Phone} from "./phone";
import {PhoneSettingService} from "./phone.service";
import {Token} from "../../../../../routes/authentication/token.model";
import {ToastrService} from "ngx-toastr";
import swal from "sweetalert2";
import {SharedService} from "../../../../../shared/shared.service";

@Component({
  selector: "phone",
  templateUrl: "phone.component.html",
  styleUrls: ["../contact-info.component.css"]
})
export class PhoneComponent implements OnInit {
  phones: Phone = new Phone();
  phonesList: any;
  token: Token;
  selectDefaultValue = '';
  validationErrors = [];
  numberValue;
  formLoading = false;
  phoneAlreadyExists = '';

  constructor(
    private phoneService: PhoneSettingService,
    private _toastr: ToastrService,
    private _sharedService: SharedService
    ) {}
  ngOnInit() {
    this.getPhone();
  }

  displayModal(modal): void {
    this.validationErrors = [];
    modal.show();
  }

  closeModal(modal): void {
    this.validationErrors = [];
    modal.hide();
  }

  getPhone(): void {
    this.phoneService.getPhones().subscribe(
      res => {
        this.phonesList = res;
      }, err => {
        if (err.status === 401) {
          swal({type: 'info', title: '', text: err.text, showConfirmButton: true}).then((isConfirmed) => {
            if (isConfirmed.value) {
              this._sharedService.logout();
            }
          }).catch(swal.noop);
        } else {
          this._toastr.error(err.text, "Error!", {progressBar: true, closeButton: true})
        }
      }
    );
  }

  addPhones(form, modal): void {
    const formData = form.value;
    const phoneInfo = {
      number: formData.number,
      isVerified: false,
      phoneType: formData.phoneType
    };

    this.formLoading = true;

    this.phoneService.addPhone(phoneInfo).subscribe(
      res => {
        this.phonesList.push(res);
        this._toastr.success("Phone number added successfully", "Success!", {progressBar: true, closeButton: true});
        this.selectDefaultValue = '';
        this.validationErrors = [];
        this.numberValue = '';
        this.formLoading = false;
        modal.hide();
      },
      err => {
        if (err.status === 422) {
          this.formLoading = false;
          // this.validationErrors = [];
          let validationError = err;
          for(let e = 0; e < validationError.text.length; e++) {
            this.validationErrors[validationError.text[e].path] = "";
            this.validationErrors[validationError.text[e].path] =  validationError.text[e].message;
          }
        } else if (err.status === 409) {
          this.phoneAlreadyExists = err.text;
          this.formLoading = false;
        } else {
          this.formLoading = false;
          this._toastr.error(err.text, "Error!", {progressBar: true, closeButton: true});
          return;
        }
      }
    );
  }

  deletePhone(phoneId: string): void {
    (window as any).swal(
      {
        title: "Are you sure?",
        text: "",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, Remove it!",
        closeOnConfirm: true
      },
      () => {
        this.phoneService.deletePhone(phoneId).subscribe(res => {
          this._toastr.success("Phone number removed successfully", "Success!", {progressBar: true, closeButton: true});
          var self = this;
          (window as any).swal("Removed!", "", "success");
          setTimeout(function() {
            var index = self.phonesList.map(function(x) {
              return x._id;
            })
              .indexOf(phoneId);
            if (index > -1) {
              self.phonesList.splice(index, 1);
            } else {
              self.phonesList = self.phonesList;
            }
          }, 1000);

          }, err => {
          this._toastr.error(err.text, "Error!", {progressBar: true, closeButton: true});
          return;
          }
        );
      }
    );
  }
}
