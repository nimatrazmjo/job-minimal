import { Component, ViewContainerRef, ViewChild } from '@angular/core';
//import { FieldWrapper } from 'ng-formly';
@Component({
  selector: 'formly-wrapper-panel',
  template: `
    <div class="panel panel-default" style="border-top-width:1px">
      <div class="panel-heading" style="background-color: #f5f5f5">
        <span>{{to.title}}</span>
      </div>
      <div class="panel-body" style="padding-top:0;padding-bottom: 0">
        <ng-container #fieldComponent></ng-container>
      </div>
    </div>
  `,
  host:{class:'col-xs-8'},
  styles:[`:host{  padding-top: 13px;}`]
})
export class FormlyPanelWrapper 
// extends FieldWrapper 
{
  @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;
}
