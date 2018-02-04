import { Component, ViewContainerRef, ViewChild } from '@angular/core';
//import { FieldWrapper } from 'ng-formly';
@Component({
  selector: 'formly-wrapper-horizontal',
  template: `
    <div class="row" style="padding-top: 5px">
      <label style="top:7px;position:relative;float:left;padding:0 15px" attr.for="{{key}}" class="form-control-label">{{to.label}}</label>
      <div class="" style="position:relative;float:left;padding:0 15px">
        <ng-container #fieldComponent></ng-container>
      </div>
    </div>
  `
})
export class FormlyWrapperHorizontalLabel 
//extends FieldWrapper
 {
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
}
