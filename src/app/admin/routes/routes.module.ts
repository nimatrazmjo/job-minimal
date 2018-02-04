import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { menu } from './menu';
import { routes } from './routes';
import {AuthenticationGuard} from "./authentication/authentication-guard";
import {SettingModule} from "./settings/settings.module";
import { IsLoggedIn} from "./routes";
import {GeneralSearchModule} from "./general-search/general-search.module";
import {SettingComponent} from "./settings/settings.component";
import {SettingService} from "./settings/settings.service";
import { AllExchangeRateComponent } from './exchange-rate/all-exchange-rate.component';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';
import { Ng2PaginationModule } from 'ng2-pagination';
import { CoreModule } from '../../employer/core/core.module';
import { LayoutModule } from '../layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from '../../shared/authentication/authentication.module';

@NgModule({
    imports: [
        HttpClientModule,
        AuthenticationModule,
        RouterModule.forChild(routes),
        PagesModule,
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        GeneralSearchModule,
        Ng2PaginationModule        
    ],
    declarations: [SettingComponent, AllExchangeRateComponent],
    exports: [
        RouterModule,
    ],
    providers: [
        SettingService,
        AuthenticationGuard,
        IsLoggedIn,
        ExchangeRateService,
        MenuService
    ]
})

export class RoutesModule {
    constructor(private menuService: MenuService) {
        menuService.addMenu(menu);
    }
}
