import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { InfoGetterService } from '../../services/info-getter.service';
import { LoadingService } from 'src/services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { customValidator, relationValidator } from '../shared/customValidator';

@Component({
  selector: 'app-newrelation',
  templateUrl: './newrelation.component.html',
  styleUrls: ['./newrelation.component.scss'],
})
export class NewrelationComponent implements OnInit {
  constructor(private fb: FormBuilder, private infoGetterService: InfoGetterService, private _loadingService: LoadingService, private snackBar: MatSnackBar, public matDialog: MatDialog) {}
  editRelationsForm: FormGroup;
  editFlag = false;
  showFlag = false;
  buttonFlag: Boolean = false;

  personArray;
  relationTypesArray = ['thier Father is', 'their Mother is', 'their Spouse is', 'is Parent of'];
  serverResponse;
  fetchRelationsForPersonResponse;
  relationsArray;
  newPersonArray = ['', '', '', ''];

  ngOnInit(): void {
    this._loadingService.start();
    this.infoGetterService.getPersonAll().subscribe(
      (res: { opSuccess: Boolean; opContent: Object }) => {
        this.personArray = res.opContent;
        this._loadingService.stop();
      },
      (err) => {
        console.error(err);
        this._loadingService.reset();
      }
    );

    this.editRelationsForm = this.fb.group(
      {
        person_id: ['', [Validators.required, customValidator(/default/)]],
        father_id: [''],
        mother_id: [''],
        spouse_id: [''],
        children_id: this.fb.array([]),
      },
      {
        validator: [relationValidator()],
      }
    );
  }

  /* Getter Function */

  get getChildrenFA() {
    return this.editRelationsForm.get('children_id') as FormArray;
  }

  _addChildren(value) {
    this.getChildrenFA.push(this.fb.control({ value: value, disabled: false }));
  }

  _removeChildren() {
    this.getChildrenFA.removeAt(this.getChildrenFA.length - 1);
  }

  _resetForm() {
    this.editRelationsForm.reset();
    this.showFlag = false;
    this.editFlag = false;
  }

  onRelationSubmit() {
    let data: Object = { question: 'Are you sure?', submit: 'Submit' };
    let dialogRef = this.matDialog.open(ModalComponent, { data, height: '150px', width: '250px', panelClass: 'custom-modalbox' });
    dialogRef.afterClosed().subscribe((res: Boolean) => {
      if (res) {
        this._loadingService.start();
        this.infoGetterService.setRelations(this.editRelationsForm.value).subscribe(
          (res) => {
            this.serverResponse = res;
            this._loadingService.stop();
            this.snackBar.open('Updated Successfully', 'Dismiss', { duration: 5000 });
            this._resetForm();
          },
          (err) => {
            console.error(err);
            this._loadingService.reset();
            this.snackBar.open('An Error occoured', 'Dismiss', { duration: 5000 });
          }
        );
      }
    });
  }

  disableStuff() {
    this.showFlag = true;
    this.editFlag = false;
    this.editRelationsForm.get('father_id').disable();
    this.editRelationsForm.get('mother_id').disable();
    this.editRelationsForm.get('spouse_id').disable();
    this.getChildrenFA.disable();
  }

  fetchRelations() {
    this.buttonFlag = false;
    if (this.editRelationsForm.get('person_id').value == 0) {
      this.fetchRelationsForPersonResponse = [];
    } else {
      this._loadingService.start();
      this.infoGetterService.getOneRelations(this.editRelationsForm.value.person_id).subscribe(
        (res: { opSuccess: Boolean; opContent: Object }) => {
          this.fetchRelationsForPersonResponse = res.opContent;
          this.editRelationsForm.patchValue({
            father_id: this.fetchRelationsForPersonResponse.father.id,
            mother_id: this.fetchRelationsForPersonResponse.mother.id,
            spouse_id: this.fetchRelationsForPersonResponse.spouse.id,
          });
          this.getChildrenFA.clear();
          this.fetchRelationsForPersonResponse.children.forEach((child) => {
            this._addChildren(child.id);
          });
          this.disableStuff();
          this._loadingService.stop();
        },
        (err) => {
          console.error(err);
          this._loadingService.reset();
        }
      );
    }
  }

  editRelations() {
    this.buttonFlag = true;
    this.editFlag = true;

    this.editRelationsForm.get('father_id').enable();
    this.editRelationsForm.get('mother_id').enable();
    this.editRelationsForm.get('spouse_id').enable();
    this.getChildrenFA.enable();
  }
}
