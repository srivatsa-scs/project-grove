import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ViewComponent } from '../view/view.component';
import { FormBuilder } from '@angular/forms';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  providers: [ViewComponent, FormComponent],
})
export class PersonComponent implements OnInit {
  constructor(private _router: Router, private viewComponent: ViewComponent, private fb: FormBuilder) {}

  /* Flags */

  viewComponentFlag: Boolean;
  addComponentFlag: Boolean;
  addButtonFlag: Boolean;
  viewButtonFlag: Boolean;
  editButtonFlag: Boolean;

  viewComponentId: Number = 0;

  @ViewChild(ViewComponent) viewComponentData: ViewComponent;
  @ViewChild(FormComponent) resetFormData: ViewComponent;

  ngOnInit(): void {
    this.gotoView();
  }

  gotoView() {
    this.viewComponentFlag = true;
    this.addComponentFlag = false;
    this.viewButtonFlag = false;
    this.editButtonFlag = false;
    this.addButtonFlag = true;
  }

  ngAfterViewInit() {}

  toggleButtonVisibility($event: any) {
    this.editButtonFlag = true;
  }

  editThis() {
    this.viewComponentId = Number(this.viewComponentData.viewPerson?.id);
    this.addComponentFlag = true;
    this.viewComponentFlag = false;
    this.editButtonFlag = true;
    this.addButtonFlag = false;
    this.viewButtonFlag = true;
  }

  addNew() {
    this.viewComponentId = 0;
    this.viewComponentFlag = false;
    this.addComponentFlag = true;
    this.editButtonFlag = false;
    this.addButtonFlag = false;
    this.viewButtonFlag = true;
  }
}
