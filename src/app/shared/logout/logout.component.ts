import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.authentication.onLogout().toPromise()
    .then(result => {/**this.router.navigate(['/login'])**/})
    .catch(erro => {});
    
  }
}
