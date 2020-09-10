import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { customValidator, customDateValidator } from '../shared/customValidator';
import { InfoGetterService } from '../../services/info-getter.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { LangService } from '../lang.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit {
  inputForm: FormGroup;
  formStatusFlag: Number = 0; // 0: ViewForm 1: InputForm 2: UpdateForm

  constructor(
    private fb: FormBuilder,
    private _infoGetterService: InfoGetterService,
    private activatedRoute: ActivatedRoute,
    private _loadingService: LoadingService,
    private snackBar: MatSnackBar,
    public matDialog: MatDialog,
    private langService: LangService,
    private _router: Router
  ) {}

  /* Arrays of Data */

  genderArray: Array<String> = ['Male', 'Female', 'Other'];
  bloodGroupArray: Array<{ text: String; value: Number }> = [
    { text: 'A+', value: 1 },
    { text: 'A-', value: 2 },
    { text: 'B+', value: 3 },
    { text: 'B-', value: 4 },
    { text: 'AB+', value: 5 },
    { text: 'AB-', value: 6 },
    { text: 'O+', value: 7 },
    { text: 'O-', value: 8 },
    { text: 'Unknown', value: 9 },
  ];
  maritalStatusArray: Array<{ text: String; value: Number }> = [
    { text: 'Unmarried', value: 0 },
    { text: 'Married', value: 1 },
    { text: 'Unknown', value: 2 },
  ];
  nakshathraArray: Array<{ english: String; tamil: String; kannada: String; hindi: String; value: Number }> = [
    { english: 'Ashwini', tamil: 'அஸ்வினி', kannada: 'ಅಶ್ವಿನಿ', hindi: 'अश्विनी', value: 1 },
    { english: 'Bharani', tamil: 'பரணி', kannada: 'ಭರಣಿ', hindi: 'भरणी', value: 2 },
    { english: 'Kritika', tamil: 'கார்த்திகை', kannada: 'ಕೃತಿಕ', hindi: 'कृत्तिका', value: 3 },
    { english: 'Rohini', tamil: 'ரோகிணி', kannada: 'ರೋಹಿಣಿ', hindi: 'रोहिणी', value: 4 },
    { english: 'Mrigashira', tamil: 'மிருகசீரிடம்', kannada: 'ಮೃಗಶಿರ', hindi: 'म्रृगशीर्षा', value: 5 },
    { english: 'Ardra', tamil: 'திருவாதிரை', kannada: 'ಆರ್ದ್ರ', hindi: 'आर्द्रा', value: 6 },
    { english: 'Punarvasu', tamil: 'புனர்பூசம்', kannada: 'ಪುನರ್ವಸು', hindi: 'पुनर्वसु', value: 7 },
    { english: 'Pushya', tamil: 'பூசம்', kannada: 'ಪುಷ್ಯ', hindi: 'पुष्य', value: 8 },
    { english: 'Ashlesha', tamil: 'ஆயில்யம்', kannada: 'ಆಶ್ಲೇಷ', hindi: 'आश्लेषा', value: 9 },
    { english: 'Magha', tamil: 'மகம்', kannada: 'ಮಘ', hindi: 'मघा', value: 10 },
    { english: 'Poorva', tamil: 'பூரம்', kannada: 'ಪೂರ್ವ', hindi: 'पूर्व फल्गुनी', value: 11 },
    { english: 'Uttara', tamil: 'உத்திரம்', kannada: 'ಉತ್ತರ', hindi: 'उत्तर फल्गुनी', value: 12 },
    { english: 'Hasta', tamil: 'அஸ்தம்', kannada: 'ಹಸ್ತ', hindi: 'हस्त', value: 13 },
    { english: 'Chitra', tamil: 'சித்திரை', kannada: 'ಚಿತ್ರ', hindi: 'चित्रा', value: 14 },
    { english: 'Swathi', tamil: 'சுவாதி', kannada: 'ಸ್ವಾತಿ', hindi: 'स्वाती', value: 15 },
    { english: 'Vishakha', tamil: 'விசாகம்', kannada: 'ವಿಶಾಖ', hindi: 'विशाखा', value: 16 },
    { english: 'Anuradha', tamil: 'அனுஷம்', kannada: 'ಅನುರಾಧಾ', hindi: 'अनुराधा', value: 17 },
    { english: 'Jyeshtha', tamil: 'கேட்டை', kannada: 'ಜ್ಯೇಷ್ಠ', hindi: 'ज्येष्ठा', value: 18 },
    { english: 'Moola', tamil: 'மூலம்', kannada: 'ಮೂಲ', hindi: 'मूल', value: 19 },
    { english: 'Poorvashadha', tamil: 'பூராடம்', kannada: 'ಪುರ್ವಾಷಾಡ', hindi: 'पूर्वाषाढा', value: 20 },
    { english: 'Uttarashadha', tamil: 'உத்திராடம்', kannada: 'ಉತ್ತರಾಷಾಡ', hindi: 'उत्तराषाढा', value: 21 },
    { english: 'Shravana', tamil: 'திருவோணம்', kannada: 'ಶ್ರವಣ', hindi: 'श्रवण', value: 22 },
    { english: 'Dhanishta', tamil: 'அவிட்டம்', kannada: 'ಧನಿಷ್ಠ', hindi: 'धनिष्ठा', value: 23 },
    { english: 'Shatabhisha', tamil: 'சதயம்', kannada: 'ಶತಭಿಷ', hindi: 'शततारका', value: 24 },
    { english: 'Poorva Bhadrapada ', tamil: 'பூரட்டாதி', kannada: 'ಪೂರ್ವ ಭಾದ್ರಪದ', hindi: 'पूर्वभाद्रपदा', value: 25 },
    { english: 'Uttara Bhadrapada ', tamil: 'உத்திரட்டாதி', kannada: 'ಉತ್ತರ ಭಾದ್ರಪದ', hindi: 'उत्तरभाद्रपदा', value: 26 },
    { english: 'Revati', tamil: 'ரேவதி', kannada: 'ರೇವತಿ', hindi: 'रेवती', value: 27 },
    { english: '?', tamil: '?', kannada: '?', hindi: '?', value: 28 },
  ];
  rasiArray: Array<{ english: String; tamil: String; kannada: String; hindi: String; value: Number }> = [
    { english: 'Aries', tamil: 'மேஷம்', kannada: 'ಮೇಷ', hindi: 'मेष', value: 1 },
    { english: 'Taurus', tamil: 'ரிஷபம்', kannada: 'ವೃಷಭ', hindi: 'वृषभ', value: 2 },
    { english: 'Gemini', tamil: 'மிதுனம்', kannada: 'ಮಿಥುನ', hindi: 'मिथुन', value: 3 },
    { english: 'Cancer', tamil: 'கடகம்', kannada: 'ಕರ್ಕಾಟಕ', hindi: 'कर्क', value: 4 },
    { english: 'Leo', tamil: 'சிம்மம்', kannada: 'ಸಿಂಹ', hindi: 'सिंह', value: 5 },
    { english: 'Virgo', tamil: 'கன்னி', kannada: 'ಕನ್ಯಾ', hindi: 'कन्या', value: 6 },
    { english: 'Libra', tamil: 'துலாம்', kannada: 'ತುಲಾ', hindi: 'तुला', value: 7 },
    { english: 'Scorpio', tamil: 'விருச்சிகம்', kannada: 'ವೃಶ್ಚಿಕ', hindi: 'वृश्चिक', value: 8 },
    { english: 'Sagittarius', tamil: 'தனுசு', kannada: 'ಧನು', hindi: 'धनुष', value: 9 },
    { english: 'Capricorn', tamil: 'மகரம்', kannada: 'ಮಕರ', hindi: 'मकर', value: 10 },
    { english: 'Aquarius', tamil: 'கும்பம்', kannada: 'ಕುಂಭ', hindi: 'कुम्भ', value: 11 },
    { english: 'Pisces', tamil: 'மீனம்', kannada: 'ಮೀನ', hindi: 'मीन', value: 12 },
    { english: '?', tamil: '?', kannada: '?', hindi: '?', value: 13 },
  ];

  monthArray: Array<{ text: String; value: Number }> = [
    { text: 'January', value: 1 },
    { text: 'February', value: 2 },
    { text: 'March', value: 3 },
    { text: 'April', value: 4 },
    { text: 'May', value: 5 },
    { text: 'June', value: 6 },
    { text: 'July', value: 7 },
    { text: 'August', value: 8 },
    { text: 'September', value: 9 },
    { text: 'October', value: 10 },
    { text: 'November', value: 11 },
    { text: 'December', value: 12 },
  ];

  /* Secondary Declations */

  updateFlag: Boolean = false;
  updatePersonId: Number;
  submitButton: String;
  languageChoice: any = 'english';

  ngOnInit(): void {
    /* Form Group and Controls */
    this.submitButton = 'Submit';
    this.langService.currentMessage.subscribe((message) => {
      this.languageChoice = message;
    });

    this.inputForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2), customValidator(/admin/), customValidator(/\d+/), Validators.maxLength(100)]],
      lastName: [null, [Validators.required, Validators.pattern, customValidator(/\d+/), Validators.minLength(1), Validators.maxLength(100)]],
      gender: [null, [Validators.required, customValidator(/default/)]],
      bloodGroup: [null, [customValidator(/default/)]],
      dateOfBirth: this.fb.group(
        {
          dayOfBirth: [null, [Validators.min(1), Validators.max(31)]],
          monthOfBirth: [null, [customValidator(/default/)]],
          yearOfBirth: [null, [Validators.maxLength(4), Validators.min(1900), Validators.max(2100)]],
        },
        { validators: customDateValidator() }
      ),
      maritalStatus: [null, [customValidator(/default/)]],
      contactInformation: this.fb.group({
        email: [null, [Validators.email]],
        phone: [null, [Validators.pattern(/^[0-9]{10}$/)]],
      }),
      address: this.fb.group({
        address1: [null],
        townCity: [null],
        provinceState: [null],
        country: [null],
        postalCode: [null],
      }),
      astrology: this.fb.group({
        gothra: [null],
        nakshathra: [null, [customValidator(/default/)]],
        rasi: [null, [customValidator(/default/)]],
      }),
      dateOfDeath: [null],
      photo: [null],
      imgPath: [null],
      deceased: [null],
    });

    this.inputForm.get('deceased').valueChanges.subscribe((checked) => {
      const dead = this.inputForm.get('dateOfDeath');
      if (checked) {
        dead.setValidators(Validators.required);
      } else {
        dead.reset();
        dead.clearValidators();
      }
      dead.updateValueAndValidity();
    });

    this.updatePersonId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.updatePersonId > 0) {
      this._loadingService.start();
      this._infoGetterService.getOnePerson(this.updatePersonId).subscribe(
        (res: { opStatus: Boolean; opContent: Object }) => {
          this.inputForm.patchValue(res.opContent);
          this.submitButton = 'Update';
          this._loadingService.stop();
        },
        (err) => {
          console.error(err);
          this._loadingService.reset();
        }
      );
    }
  }

  @Input() viewComponentId: Number;

  ngAfterViewInit() {
    if (this.viewComponentId == 0) {
      this.resetForm();
    }

    if (this.viewComponentId > 0) {
      this._loadingService.start();
      this._infoGetterService.getOnePerson(this.viewComponentId).subscribe(
        (res: { opStatus: Boolean; opContent: any }) => {
          this.inputForm.patchValue(res.opContent);
          this.updatePersonId = res.opContent.id;
          this.submitButton = 'Update';
          this._loadingService.stop();
        },
        (err) => {
          console.error(err);
          this._loadingService.reset();
        }
      );
    }
    this.langService.currentMessage.subscribe((message) => {
      this.languageChoice = message;
    });
  }
  /* Functions */

  resetForm() {
    this.inputForm.reset();
    this.submitButton = 'Submit';
  }

  /* Image Select handler */
  images;
  imagePath: String;

  onImageSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      let formData = new FormData();
      formData.append('image', this.images);
      this._loadingService.start();
      this._infoGetterService.uploadImage(formData).subscribe(
        (res) => {
          this.inputForm.get('imgPath').patchValue(res.imgPath);
          this._loadingService.stop();
        },
        (err) => {
          console.error(err);
          this._loadingService.reset();
          this.snackBar.open('Photo could not uploaded', 'Dismiss', { duration: 5000 });
        }
      );
    }
  }

  /* Submit handler */
  onSubmit() {
    let data: Object = { question: 'Are you sure?', submit: 'Submit' };
    let dialogRef = this.matDialog.open(ModalComponent, { data, height: '150px', width: '250px', panelClass: 'custom-modalbox' });
    dialogRef.afterClosed().subscribe((res: Boolean) => {
      if (res) {
        if (this.submitButton == 'Update') {
          let inputFormCopy = this.inputForm.value;
          inputFormCopy.id = this.updatePersonId;
          this._loadingService.start();
          this._infoGetterService.updatePerson(inputFormCopy).subscribe(
            (res: { opSuccess: Boolean; opContent: Object }) => {
              this._loadingService.stop();
              this.resetForm();
              this.snackBar.open('Updated Successfully', 'Dismiss', { duration: 5000 });
              this._router.navigate(['home']);
            },
            (err) => {
              console.error(err);
              this._loadingService.reset();
              this.snackBar.open('An Error occoured', 'Dismiss', { duration: 5000 });
            }
          );
        } else if (this.submitButton == 'Submit') {
          this._loadingService.start();
          this._infoGetterService.addPerson(this.inputForm.value).subscribe(
            (res: { opSuccess: Boolean; opContent: Object }) => {
              this._loadingService.stop();
              this.snackBar.open('Submitted Successfully', 'Dismiss', { duration: 5000 });
              this._router.navigate(['home']);
            },
            (err) => {
              console.error(err);
              this._loadingService.reset();
              this.snackBar.open('An Error occoured', 'Dismiss', { duration: 5000 });
            }
          );
        }
      }
    });
  }
}
