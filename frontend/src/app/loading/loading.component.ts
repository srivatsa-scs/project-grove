import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  showLoader: Boolean = true;

  constructor(private _loadingService: LoadingService, private _cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this._loadingService.getLoadingOberserver().subscribe((status) => {
      /* This listens to see if the event emmited by the LoadingService is of type Start, if it is the the loader is shown, else the loader is hidden (stop, reset) */
      this.showLoader = status == 'start';
      this._cdRef.detectChanges();
    });
  }
}
