import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {
    this.modalObservable$ = this.modalSubject.asObservable();
  }
  private modalSubject: Subject<any> = new Subject<any>();
  public modalObservable$: Observable<any>;

  onYes() {}
  onNo() {}
}
