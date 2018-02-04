import { Injectable } from "@angular/core";

@Injectable()
export class BreadcrumbService {
  private routesFriendlyNames: Map<string, string> = new Map<string, string>();
  private routesMappedUrl: Map<string, string> = new Map<string, string>();
  private routesMappedTitle: Map<string, string> = new Map<string, string>();
  private routesMappedPageTitle: Map<string, string> = new Map<string, string>();
  private routesIcons: Map<string, string> = new Map<string, string>();
  private routesFriendlyNamesRegex: Map<string, string> = new Map<
    string,
    string
  >();
  private routesWithCallback: Map<string, (string: string) => string> = new Map<
    string,
    (string: string) => string
  >();
  private routesWithCallbackRegex: Map<
    string,
    (string: string) => string
  > = new Map<string, (string: string) => string>();
  private hideRoutes: any = new Array<string>();
  private hideRoutesRegex: any = new Array<string>();
  constructor() {}
  /**
     * Specify a friendly name for the corresponding route.
     *
     * @param route
     * @param name
     */
  addFriendlyNameForRoute(routes: Array<string>, names: Array<string>): void {
    for (var r = 0; r < routes.length; r++) {
      this.routesFriendlyNames.set(routes[r], names.hasOwnProperty(r) ? names[r] : '');
    }
  }

  /**
     * Specify a friendly name for the corresponding route matching a regular expression.
     *
     * @param route
     * @param name
     */
  addFriendlyNameForRouteRegex(routeRegex: string, name: string): void {
    this.routesFriendlyNamesRegex.set(routeRegex, name);
  }

  /**
   * Specify a custom url for the corresponding route.
   *
   * @param route
   * @param name
   */
  addAnotherUrlForRoute(routes: Array<string>, urls: Array<string>): void {
    //this.routesMappedUrl.set(route, url);
    for (var r = 0; r < routes.length; r++) {
      this.routesMappedUrl.set(routes[r], urls.hasOwnProperty(r) ? urls[r] : '');
    }
  }

  /**
   * Specify a custom icon for the corresponding route.
   *
   * @param route
   * @param name
   */
  addIconForRoute(routes: Array<string>, icons: Array<string>): void {
    //this.routesIcons.set(route, icon);
    for (var r = 0; r < routes.length; r++) {
      this.routesIcons.set(routes[r], icons.hasOwnProperty(r) ? icons[r] : '');
    }
  }

  /**
   * Specify a custom title for the corresponding route.
   *
   * @param route
   * @param name
   */
  addTitleForRoute(routes: Array<string>, titles: Array<string>): void {
    //this.routesMappedTitle.set(route, title);
    for (var r = 0; r < routes.length; r++) {
      this.routesMappedTitle.set(routes[r], titles.hasOwnProperty(r) ? titles[r] : '');
    }
  }

  /**
   * Specify a custom page title for the corresponding route.
   *
   * @param route
   * @param name
   */
  addPageTitleForRoute(route: string, title: string): void {
    this.routesMappedPageTitle.set(route, title);
  }

  /**
     * Specify a callback for the corresponding route.
     * When a mathing url is navigatedd to, the callback function is invoked to get the name to be displayed in the breadcrumb.
     */
  addCallbackForRoute(route: string, callback: (id: string) => string): void {
    this.routesWithCallback.set(route, callback);
  }

  /**
     * Specify a callback for the corresponding route matching a regular expression.
     * When a mathing url is navigatedd to, the callback function is invoked to get the name to be displayed in the breadcrumb.
     */
  addCallbackForRouteRegex(
    routeRegex: string,
    callback: (id: string) => string
  ): void {
    this.routesWithCallbackRegex.set(routeRegex, callback);
  }

  /**
     * Show the friendly name for a given route (url). If no match is found the url (without the leading '/') is shown.
     *
     * @param route
     * @returns {*}
     */
  getFriendlyNameForRoute(route: string): string {
    let name: string;
    let routeEnd = route.substr(route.lastIndexOf("/") + 1, route.length);

    this.routesFriendlyNames.forEach((value, key, map) => {
      if (key === route) {
        name = value;
      }
    });

    this.routesFriendlyNamesRegex.forEach((value, key, map) => {
      if (new RegExp(key).exec(route)) {
        name = value;
      }
    });

    this.routesWithCallback.forEach((value, key, map) => {
      if (key === route) {
        name = value(routeEnd);
      }
    });

    this.routesWithCallbackRegex.forEach((value, key, map) => {
      if (new RegExp(key).exec(route)) {
        name = value(routeEnd);
      }
    });

    return name ? name : routeEnd;
  }


  /**
   * Show the mapped url for a given route (url). If no match is found the url (without the leading '/') is shown.
   *
   * @param route
   * @returns {*}
   */
  getMappedUrlForRoute(route: string): string {
    let url: string;
    let routeEnd = route.substr(route.lastIndexOf("/") + 1, route.length);
    this.routesMappedUrl.forEach((value, key, map) => {

      if (key === route) {
        url = value;
      }
    });

    return url ? url : '/admin/'+routeEnd;
  }

  /**
   * Show the mapped icon for a given route (url). If no match is found no icon is shown.
   *
   * @param route
   * @returns {*}
   */
  getMappedIconForRoute(route: string): string {
    let icon: string;
    this.routesIcons.forEach((value, key, map) => {
      if (key === route) {
        icon = value;
      }
    });

    return icon ? icon : '';
  }

  /**
   * Show the mapped title for a given route (url). If no match is found no icon is shown.
   *
   * @param route
   * @returns {*}
   */
  getMappedTitleForRoute(route: string): string {
    let routTitle: string;
    this.routesMappedTitle.forEach((value, key, map) => {
      if (key === route) {
        routTitle = value;
      }
    });

    return routTitle ? routTitle : '';
  }

  /**
   * Show the mapped title for a given route (url). If no match is found no icon is shown.
   *
   * @param route
   * @returns {*}
   */
  getMappedPageTitleForRoute(route: string): string {
    let routTitle: string;
    this.routesMappedPageTitle.forEach((value, key, map) => {
      if (key === route) {
        routTitle = value;
      }
    });

    return routTitle ? routTitle : '';
  }

  /**
     * Specify a route (url) that should not be shown in the breadcrumb.
     */
  hideRoute(route: string): void {
    if (this.hideRoutes.indexOf(route) === -1) {
      this.hideRoutes.push(route);
    }
  }

  /**
     * Specify a route (url) regular expression that should not be shown in the breadcrumb.
     */
  hideRouteRegex(routeRegex: string): void {
    if (this.hideRoutesRegex.indexOf(routeRegex) === -1) {
      this.hideRoutesRegex.push(routeRegex);
    }
  }

  /**
     * Returns true if a route should be hidden.
     */
  isRouteHidden(route: string): boolean {
    let hide = this.hideRoutes.indexOf(route) > -1;

    this.hideRoutesRegex.forEach((value: any) => {
      if (new RegExp(value).exec(route)) {
        hide = true;
      }
    });

    return hide;
  }
}
