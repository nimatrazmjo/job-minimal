import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GlobalErrorHandler} from "./global-error-handler";
import {Error404Component} from "./error404/error404.component";
import {Error500Component} from "./error500/error500.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Error404Component,
    Error500Component
  ],
  providers: [GlobalErrorHandler],
  exports: [
    Error404Component,
    Error500Component
  ],
  entryComponents: []
})
export class ErrorHandlerModule { }