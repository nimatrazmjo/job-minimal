import { Component, OnInit } from "@angular/core";
import {User} from "../user";
import {Token} from "../../../../routes/authentication/token.model";
import {configuration} from "../../../../../../environments/.env";
import {TokenService} from "../../../../routes/authentication/token.service";
import {ActiveSessionService} from "./active-sessions.service";
import {SharedService} from "../../../../shared/shared.service";
import {EmployerDataProvider} from "../../../provider/employerDataProvider";
import swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: "active-sessions",
  templateUrl: "active-sessions.component.html",
  styleUrls: ["../settings.component.css"]
})
export class ActiveSessionsComponent implements OnInit {
  user: User = new User();
  logged_in_user_id: string;
  userActiveSession;
  userNotActiveSessions;
  userToken: Token;
  p: number = 0;
  perPage = configuration.PER_PAGE;
  total: number;
  page: number = 1;

  constructor(private tokenService: TokenService,
              private activeSessionService: ActiveSessionService,
              private _sharedService: SharedService,
              private _employerDataProvider: EmployerDataProvider,
              private _toastr: ToastrService
              ) {
    this.userToken = tokenService.getToken();
  }

  async ngOnInit() {

    this.logged_in_user_id = this.userToken.getCurrentUserId();
    // await this.getAuthUser();
    this.getUserActiveSession();
    this.loadData();
  }

  loadData() {
    this.getUserOtherSessions(this.page);
  }

  getUserActiveSession(): void {
    this.activeSessionService.getActiveSession().subscribe(res => {
      this.userActiveSession = res;
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
  }

  getUserOtherSessions(page: number): void {
    this.activeSessionService.getOtherSessions(page, this.perPage).subscribe(res => {
      this.userNotActiveSessions = res;
      this.p = page;
    }, err => {
      if (err.status === 401) {

      } else {
        this._toastr.error(JSON.parse(err._body).message, "Error!", {progressBar: true, closeButton: true});
      }
    });
    this.getOtherSessionsCount();
  }

  getOtherSessionsCount(): void {
    this.activeSessionService
      .getOtherSessionsCount()
      .subscribe(count => (this.total = count));
  }

  blockSession(sessionId: string): void {
    (window as any).swal(
      {
        title: "Are you sure you want to block this session?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Block it!",
        confirmButtonClass: "btn-danger",
        closeOnConfirm: false
      },
      () => {
        this.activeSessionService.blockUserSession(sessionId).subscribe(res => {
            setTimeout(() => {
              (window as any).swal({
                title: 'Blocked successfully!',
                text: '',
                type: 'success',
                timer: 1000
              });
              setTimeout(() => {
                this.loadData();
              }, 1000);
            }, 1000);
          },
          err => {
            setTimeout(() => {
              (window as any).swal({
                title: 'Opps!',
                text: 'Something went wrong!',
                type: 'error',
                timer: 1000
              });
            }, 1000);
          }
        );
      }
    );
  }

  blockAllSessions(): void {
    (window as any).swal(
      {
        title: "Are you sure you want to block all sessions?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Block!",
        confirmButtonClass: "btn-danger",
        closeOnConfirm: false
      },
      () => {
        this.activeSessionService.blockAllSessions(this.userToken.token).subscribe(res => {
            setTimeout(() => {
              (window as any).swal({
                title: 'Blocked successfully!',
                text: '',
                type: 'success',
                timer: 1000
              });
              setTimeout(() => {
                this.loadData();
              }, 1000);
            }, 1000);
          },
          err => {
            setTimeout(() => {
              (window as any).swal({
                title: 'Opps!',
                text: 'Something went wrong!',
                type: 'error',
                timer: 1000
              });
            }, 1000);
          }
        );
      }
    );
  }

}
