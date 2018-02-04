import { Component, OnInit } from '@angular/core';
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from "@angular/router";
import {SettingsService} from "../../settings/settings.service";

@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.scss']
})
export class Error500Component implements OnInit {

  constructor(public settings: SettingsService,
              private router: Router) { }

  ngOnInit() {}

  redirectAction(): void {
    const urlTree: UrlTree = this.router.parseUrl(this.router.url);
    const segmentGroup: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
    const segment: UrlSegment[] = segmentGroup.segments;
    if (segment[0].path === 'admin') {
      this.router.navigate(['/admin/user/admin']);
    }
    else if (segment[0].path === 'employer') {
      this.router.navigate(['/employer/dashboard']);
    }
    else {
      this.router.navigate(['/job']);
    }
  }

}
