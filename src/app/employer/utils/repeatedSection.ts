import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
//import { FieldType, FormlyFieldConfig } from 'ng-formly';
import { clone } from './utils';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div *ngFor="let control of formControl.controls; let i = index;">
      <formly-form
        [model]="model[i]"
        [fields]="fields(i)"
        [options]="newOptions"
        [form]="this.formControl.at(i)"
        [ngClass]="field.fieldArray.className">
      </formly-form>
      <div style="padding-top:5px" *ngIf="!field.templateOptions.disabled" class="col-md-2">
        <button type="button" class="btn btn-danger" (click)="remove(i)">Remove</button>
      </div>
    </div>
    <div *ngIf="!field.templateOptions.disabled" style="margin:30px 0;">
      <button type="button" class="btn btn-primary" (click)="add()">
      <span *ngIf="!formControl.controls.length">{{field.templateOptions.btnAddText}}</span>
      <span *ngIf="formControl.controls.length">{{field.templateOptions.btnAnotherText}}</span>
      </button>
    </div>
  `,
})
export class RepeatComponent 
//extends FieldType implements OnInit 
{
  _fields = [];

  // get newOptions() {
  //  return clone(this.options);
  // }

  ngOnInit() {
    // if (this.model) {
    //   this.model.map(() => {
    //     (<FormArray>this.formControl).push(new FormGroup({}));
    //     this._fields.push(
    //       JSON.parse(JSON.stringify(this.field.fieldArray.fieldGroup)),
    //     );
    //   });
    // }
  }

  add() {
    // this.model.push({});
    // this._fields.push(
    //   JSON.parse(JSON.stringify(this.field.fieldArray.fieldGroup)),
    // );
    // (<FormArray>this.formControl).push(new FormGroup({}));
  }

  remove(i) {
    // (<FormArray>this.formControl).removeAt(i);
    // this.model.splice(i, 1);
    // this._fields.splice(i, 1);
  }

  fields(i) {
    if (this._fields[i]) {
      return this._fields[i];
    }

    // this._fields.splice(i, 0, JSON.parse(JSON.stringify(this.field.fieldArray.fieldGroup)));

    return this._fields[i];
  }
}
