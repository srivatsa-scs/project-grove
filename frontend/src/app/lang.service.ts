import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private messageSource = new BehaviorSubject<string>('english');
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeLanguage(message: string) {
    this.messageSource.next(message);
  }
}
