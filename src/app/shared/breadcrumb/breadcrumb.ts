import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { BreadcrumbService } from "./breadcrumbService";

/**
 * This component shows a breadcrumb trail for available routes the router can navigate to.
 * It subscribes to the router in order to update the breadcrumb trail as you navigate to a component.
 */
@Component({
  selector: "breadcrumb",
  template: `
       <div class="row bg-title">
        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
          <h4 class="page-title">{{routeMappedPageTitle(pageUrl) !== '' ? routeMappedPageTitle(pageUrl) :_segments.length && _segments[_segments.length-1].name}}</h4>
        </div>
        <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
          <ol class="breadcrumb">
            <ng-container  *ngFor="let url of _segments; let last = last">
              <li *ngIf="!isRouteHidden(url.url)" [ngClass]="{'breadcrumb-item': useBootstrap, 'active': last}" title="{{routeMappedTitle(url.url)}}">
                <a role="button" *ngIf="!last && url == prefix" (click)="navigateTo(url.url)"><i [ngClass]="mappedIcon(url.url)">&nbsp;</i>{{url.name}}</a>
                <a role="button" *ngIf="!last && url != prefix" (click)="navigateTo(url.url)"><i [ngClass]="mappedIcon(url.url)">&nbsp;</i>{{url.url | breadcrumbUrlFriendlyName}}</a>
                <span *ngIf="last"><i [ngClass]="mappedIcon(url.url)">&nbsp;</i>{{url.url | breadcrumbUrlFriendlyName}}</span>
                <span *ngIf="last && url == prefix"><i [ngClass]="mappedIcon(url.url)">&nbsp;</i>{{"/" | breadcrumbUrlFriendlyName}}</span>
              </li>
            </ng-container>
          </ol>
        </div>
      <!-- /.col-lg-12 -->
      </div>

  
    `,
  styles: [
    `
    .bg-title {
      margin-bottom: 0px; !important;
    }
    .globalBreadcrumb{
        background: white;
        //border-radius: 2px;
        //border: 1px solid #d6d6d6;
    }
    .breadcrumb{
      margin-bottom: 0px !important;
      float: right;
      padding: 7px 20px;
      color:inherit; 
    }

    .titlebar{
      background: #fff;
      overflow: hidden;
      padding: 5px 15px 2px;
      margin:0 0;
    }

    .breadcrumb-item a{
      color:inherit;
    }

    .breadcrumb .active {
      color: #f75b36;
    }

    .title{
      float: left;
      margin: 7px 20px;
    }

    `

  ]
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() useBootstrap: boolean = true;
  @Input() prefix: string = "";

  public _urls: string[];
  public _routerSubscription: any;
  public _segments: { url: string; name: string }[] = [];
  public _title: string;
  public pageUrl: string;
  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this._urls = new Array();

    if (this.prefix.length > 0) {
      this._urls.unshift(this.prefix);
    }
    this.pageUrl = this.router.url;
    this.makeSegments(this.router.routerState.root);

    this._routerSubscription = this.router.events.subscribe(
      (navigationEnd: NavigationEnd) => {
        if (navigationEnd instanceof NavigationEnd) {
          this.pageUrl = this.router.url;

          this.makeSegments(this.router.routerState.root);
          //this.generateBreadcrumbTrail(navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url);
        }
      }
    );

    //this.generateBreadcrumbTrail(this.router.url);
  }

  makeSegments(state) {
    this.emptySegments();
    this.getChildren(state);
  }

  emptySegments() {
    this._segments.length = 0;
  }

  getChildren(state) {
    if (state.snapshot.url.length || state.snapshot.data["name"]) {
      let segmentUrl = "";
      let segmentName = "";

      if (state.snapshot.url.length) {
        segmentUrl = state.snapshot.url
          .map(val => val.path)
          .filter(val => val.length)
          .join("/");
      }

      if (state.snapshot.data["name"]) {
        if (state.snapshot.data["name"].resolveFrom) {
          let depth = state.snapshot.data["name"].resolveFrom.split(".");
          segmentName = depth.reduce((x, y) => {
            return x[y];
          }, state.snapshot.data);
        } else {
          segmentName = state.snapshot.data["name"];
        }
      } else {
        segmentName = segmentUrl.replace("/", "-");
      }
      this.pushSegment({ url: segmentUrl, name: segmentName });
    }

    if (state.children.length) {
      this.getChildren(state.children[0]);
    }
  }

  pushSegment({ url = "", name = "" } = {}) {
    if (this._segments.length == 0) {
      url = "/" + url;
    } else {
      url = this._segments[this._segments.length-1].url + "/" + url;
    }
    if (!this.breadcrumbService.isRouteHidden(url)) {
      this._segments.push({url: url, name: name});
    }
  }

  ngOnChanges(changes: any): void {
    if (!this._urls) {
      return;
    }

    this._urls.length = 0;
    this.generateBreadcrumbTrail(this.router.url);
  }

  generateBreadcrumbTrail(url: string): void {
    if (!this.breadcrumbService.isRouteHidden(url)) {
      //Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
      this._urls.unshift(url);
    }

    if (url.lastIndexOf("/") > 0) {
      this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf("/"))); //Find last '/' and add everything before it as a parent route
    } else if (this.prefix.length > 0) {
      this._urls.unshift(this.prefix);
    }
  }

  navigateTo(url: string): void {
    let mappedURL = this.breadcrumbService.getMappedUrlForRoute(url);
    this.router.navigateByUrl(mappedURL);
  }

  friendlyName(url: string): string {
    return !url ? "" : this.breadcrumbService.getFriendlyNameForRoute(url);
  }

  mappedUrl(url: string): string {
    return !url ? "" : this.breadcrumbService.getMappedUrlForRoute(url);
  }

  mappedIcon(url: string): string {
    return !url ? "" : this.breadcrumbService.getMappedIconForRoute(url);
  }

  routeMappedTitle(url: string): string {
    return !url ? "" : this.breadcrumbService.getMappedTitleForRoute(url);
  }

  routeMappedPageTitle(url: string): string {
    return !url ? "" : this.breadcrumbService.getMappedPageTitleForRoute(url);
  }

  isRouteHidden(url: string): Boolean {
    return this.breadcrumbService.isRouteHidden(url);
  }

  ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }
}
