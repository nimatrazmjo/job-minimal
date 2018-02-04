import { NgModule, ModuleWithProviders, OpaqueToken } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SubscribeService } from "./subscribe.service";
import { Publish } from "./publish.service";
// import { AuthService } from "../../client/app/users/auth.service";

// export const ServerUrl = new OpaqueToken('url')

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    SubscribeService,
    Publish,
    // AuthService
  ]
})
export class StreamModule {
  static forRoot(url: string): ModuleWithProviders {
    return {
      ngModule: StreamModule,
      providers: [
        SubscribeService,
        Publish,
        // AuthService,
        { provide: "ServerUrl", useValue: url }
      ]
    };
  }
}
