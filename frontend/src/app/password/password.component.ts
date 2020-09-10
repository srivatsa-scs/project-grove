import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { LoadingService } from 'src/services/loading.service';
import { passwordValidator, passwordDiff } from '../shared/customValidator';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  constructor(private _fb: FormBuilder, private _authService: AuthService, private _loadingService: LoadingService, private snackBar: MatSnackBar, public matDialog: MatDialog) {}

  changePasswordForm: FormGroup;

  ngOnInit(): void {
    this.changePasswordForm = this._fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validator: [passwordValidator, passwordDiff],
      }
    );
  }

  onSubmit() {
    this._loadingService.start();
    this._authService.changePass(this.changePasswordForm.value).subscribe(
      (res) => {
        this._authService.refreshToken(res.token);
        this._loadingService.stop();
        this.snackBar.open('Password has been changed', 'Dismiss', { duration: 5000 });
        this._authService.logout();
      },
      (err) => {
        console.error(err);
        this._loadingService.reset();
        this.snackBar.open('An Error Occoured, please try again', 'Dismiss', { duration: 5000 });
      }
    );
  }
}
