import { NgModule } from '@angular/core';
import {
  AuthModule,
  AUTH_SERVICE,
  PUBLIC_FALLBACK_PAGE_URI,
  PROTECTED_FALLBACK_PAGE_URI
} from 'ngx-auth';

import { TokenService } from './token.service';
import { AuthenticationService } from './authentication.service';

export function factory(authenticationService: AuthenticationService) {
  return authenticationService;
}

@NgModule({
  imports: [AuthModule],
  providers: [
    TokenService,
    AuthenticationService,
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/job' },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/login' },
    {
      provide: AUTH_SERVICE,
      deps: [AuthenticationService],
      useFactory: factory
    }
  ]
})
export class AuthenticationModule {

}
