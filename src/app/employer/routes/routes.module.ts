import { Ng2PaginationModule } from 'ng2-pagination';
import { TalentSearchComponent } from './jobs/talent-search/talent-search.component';
import { AuthGuard } from './authentication/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';
import { menu } from './menu';
import { routes } from './routes';
import { TokenGuard } from "./authentication/token.guard";
import { ActiveSessionService } from "../layout/sidebar/settings/active-sessions/active-sessions.service";
import { CompanyVerificationGuard } from "./authentication/companyVerification.component";
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PageNotFoundComponent} from "./pages/404/pageNotFound.component";
import { CoreModule } from '../core/core.module';
import { LayoutComponent } from '../layout/layout.component';
import { LayoutModule } from '../layout/layout.module';
import { SharedService } from '../shared/shared.service';
import { EmployerDataProvider } from '../layout/provider/employerDataProvider';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { SecurePipe } from './authentication/SecurePipe.pipe';
import {CompanyComponent} from "./company/company.component";

@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    LayoutModule,
    RouterModule.forChild(routes),
    BootstrapModalModule,
    NgbModule.forRoot(),
    Ng2PaginationModule,
    ToastrModule.forRoot()
  ],
   declarations: [CompanyComponent, TalentSearchComponent, PageNotFoundComponent, SecurePipe],
   providers: [
     AuthGuard, 
     TokenGuard, 
     ActiveSessionService, 
     CompanyVerificationGuard,
    //  SocketService,
    ToastrService,
     SharedService,
     EmployerDataProvider
  ]
})
export class RoutesModule {
  constructor(
    private menuService: MenuService,
    private _router: Router,
    private _location: Location
  ) {
    menuService.addMenu(menu, this._location.path());
  }
}
