/**
 * Created by swazeri on 12/18/17.
 */
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrMessageService } from "../../admin/shared/toastr-message.service";

@Injectable()
export class GlobalErrorHandler {
  constructor(private router: Router,
    private _toastMessage: ToastrMessageService) { }

  redirectSession(err, route?: any): void {
    if (err.status === 401) {
      (window as any).swal(
        {
          type: "info",
          title: JSON.parse(err._body).message,
          showConfirmButton: true,
        }, () => {
          this.router.navigate(["/admin/logout"]);
        });
    } else if (err.status === 404) {
      this._toastMessage.errorMessage("", err);
      return;

    } else if (err.status === 500 || err.status === 503) {
      this.router.navigate(['/admin/500']);
    }
    else {
      let message = null;
      if (err && err._body) {
        message = JSON.parse(err._body).message;
      } else {
        message = err;
      }
      if (route) {
        this._toastMessage.errorMessage(route, message);
        return;
      }
      else {
        this._toastMessage.errorMessage("", message);
        return;
      }
    }
  }

}
