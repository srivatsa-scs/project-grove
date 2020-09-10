import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UnauthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private _authService: AuthService, private snackBar: MatSnackBar) {}
  intercept(req, next) {
    return next.handle(req).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) return;
            this.snackBar.open('Your session has expired. Please log-in again.', 'Dismiss', { duration: 10000 });
            this._authService.logout();
          }
        }
      )
    );
  }
}
