import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingFlag: Boolean = false;
  private loadingObs = new BehaviorSubject<string>('');
  constructor() {}

  getLoadingOberserver(): Observable<string> {
    return this.loadingObs.asObservable();
  }

  /* Emits a start event */
  start() {
    this.loadingObs.next('start');
  }

  // Emits a stop event
  stop() {
    this.loadingObs.next('stop');
  }

  reset() {
    this.loadingObs.next('reset');
  }
}
