import { Component, OnInit, Input } from "@angular/core";
import {EmailSettingService} from "./email.service";
import {SharedService} from "../../../../../shared/shared.service";
import {ToastrService} from "ngx-toastr";
import {EmployerDataProvider} from "../../../../provider/employerDataProvider";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: "email",
  templateUrl: "email.component.html",
  styleUrls: ["../contact-info.component.css"]
})
export class EmailComponent implements OnInit {

  emailsList: any;
  isEmailExist: boolean = false;
  emailExistText;
  validationErrors = [];
  formLoading = false;
  emailAddress = '';

  constructor(
    private emailService: EmailSettingService,
    private _toastr: ToastrService,
    private _employerDataProvider: EmployerDataProvider,
    private _sharedService: SharedService,
    private router: Router)
  {}

  ngOnInit() {
    this.getEmail();
  }

  displayModal(modal): void {
    this.validationErrors = [];
    modal.show();
  }

  closeModal(modal): void {
    this.validationErrors = [];
    modal.hide();
  }

  addEmails(form, modal): void {
      const formData = form.value;
      const emailInfo = {
        address: formData.address,
        isVerified: false
      };

      this.formLoading = true;
      this.emailService.addEmail(emailInfo).subscribe(
        res => {
        this.emailsList.push(res);
        this.validationErrors = [];
        this.formLoading = false;
        this.emailAddress = '';
        modal.hide();
        this._toastr.success("Email has been added successfully", "Success!", {progressBar: true, closeButton: true});
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
          } else if (err.status === 409) {
            this.formLoading = false;
            this.emailExistText = err.text;
          } else {
            this.formLoading = false;
            this._toastr.error(err.text, "Error!", {progressBar: true, closeButton: true});
            return;
          }
        }
      );
  }

  getEmail(): void {
    this.emailService.getEmails().subscribe(
      res => {
        this.emailsList = res;
      }, err => {
        if (err.status === 401) {
          swal({type: 'info', title: '', text: err.text, showConfirmButton: true}).then((isConfirmed) => {
            if (isConfirmed.value) {
              this._sharedService.logout();
            }
          }).catch(swal.noop);
        } else {
          this._toastr.error(err.text, 'Error!', {progressBar: true, closeButton: true});
        }
      }
    );
  }

  deleteEmail(emailId: string): void {
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
        this.emailService.deleteEmail(emailId).subscribe(res => {
            var self = this;
            (window as any).swal("Removed!", "", "success");
            setTimeout(function() {
              var index = self.emailsList.map(function(x) {
                return x._id;
              })
                .indexOf(emailId);
              if (index > -1) {
                self.emailsList.splice(index, 1);
              } else {
                self.emailsList = self.emailsList;
              }
            }, 1000);
            this._toastr.success("Email has been removed successfully", "Success!", {progressBar: true, closeButton: true});
          },
          err => {
            this.getErrorMsg(err);
          }
        );
      }
    );
  }

  makeEmailPrimary(emailId: string): void {
    (window as any).swal(
      {
        title: "Are you sure you to make this email as primary?",
        text: "",
        type: "info",
        showCancelButton: true,
        confirmButtonText: "Yes, Make it!",
        closeOnConfirm: true
      },
      () => {
        this.emailService.getOneEmail(emailId).subscribe(
          emailRes => {
            if (emailRes.isVerified === true) {
              let selectedEmail = emailRes.address;

              const email = {
                email: selectedEmail
              };
              this.emailService
                .changePrimaryEmail(emailId, email)
                .subscribe(
                  changedEmail => {
                    this._employerDataProvider.storage.authUser.email = selectedEmail;
                    this._employerDataProvider.storage.authUser.email = email.email;
                    this.emailsList = changedEmail;
                    this._toastr.success("Your has been successfully changed as primary.", "Success!", {progressBar: true, closeButton: true});
                  },
                  err => {
                    this.getErrorMsg(err);
                  }
                );

            } else {
              this._toastr.error("Your email is not verified, check your email to verify.", "Error!", {progressBar: true, closeButton: true});
              return;
            }
          },
          err => {
            this.getErrorMsg(err);
          }
        );
      }
    );
  }

  getErrorMsg(err): void {
    this._toastr.error("Something went wrong!.", "Error!", {progressBar: true, closeButton: true});
  }

  clearCheckEmailText(): void {
    this.emailExistText = " ";
    this.isEmailExist = false;
  }

  onLogout(): void {
    this._sharedService.onLogout().subscribe(result => {});
    this.router.navigate(["/login"]);
  }

}
