/**
 * Created by mobasherfasihy on 1/29/2018 AD.
 */
import { Pipe, PipeTransform } from '@angular/core';
import {BreadcrumbService} from "./breadcrumbService";

@Pipe({
  name: 'breadcrumbUrlFriendlyName'
})

export class BreadcrumbUrlFriendlyName implements PipeTransform {
  constructor(private breadcrumbService: BreadcrumbService) {

  }

  transform(url: string): string {
    return !url ? "" : this.breadcrumbService.getFriendlyNameForRoute(url);
  }
}

