import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router, private _loadingService: LoadingService) {}

  loginForm: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  invalidFlag = false;
  loginUser() {
    this._loadingService.start();
    this._auth.loginUser(this.loginForm.value).subscribe(
      (res) => {
        this._loadingService.stop();
        localStorage.setItem('token', res.token); //Set token
        this._router.navigate(['home']); //Navigate to Home
      },
      (err) => {
        this.invalidFlag = true;
        console.error(err);
        this._loadingService.reset();
      }
    );
  }
}
