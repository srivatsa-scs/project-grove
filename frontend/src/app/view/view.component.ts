import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InfoGetterService } from '../../services/info-getter.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/services/loading.service';
import { LangService } from '../lang.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  constructor(private infoGetterService: InfoGetterService, private fb: FormBuilder, private _router: Router, private _loadingService: LoadingService, private langService: LangService) {}

  @Input() parentFunction: any;
  @Output() onSelect = new EventEmitter();

  viewPersonForm: FormGroup;
  persons;
  languageChoice: any = 'english';

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
    { text: 'Unknown', value: 13 },
  ];

  ngOnInit(): void {
    this.viewPersonForm = this.fb.group({
      person: [''],
    });
    this.langService.currentMessage.subscribe((message) => {
      this.languageChoice = message;
    });
    this._loadingService.start();
    this.infoGetterService.getPersonAll().subscribe(
      (res: { opSuccess: Boolean; opContent: Object }) => {
        this.persons = res.opContent;
        this._loadingService.stop();
      },
      (err) => {
        console.error(err);
        this._loadingService.reset();
      }
    );
  }

  viewPerson;
  viewPersonFlag = false;
  getPerson() {
    this._loadingService.start();
    this.infoGetterService.getOnePerson(this.viewPersonForm.get('person').value).subscribe(
      (res: { opSuccess: Boolean; opContent: Object }) => {
        if (res.opSuccess) {
          this.viewPerson = res.opContent;
          this.viewPersonFlag = true;
          this.onSelect.emit('selected');
          this._loadingService.stop();
        }
      },
      (err) => {
        console.error(err);
        this._loadingService.reset();
      }
    );
  }
}
