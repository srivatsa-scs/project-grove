import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router, private _loadingService: LoadingService) {}

  registerForm: FormGroup;
  invalidFlag = false;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  registerUser() {
    this._loadingService.start();
    this._auth.registerUser(this.registerForm.value).subscribe(
      (res) => {
        /* Set Token */
        localStorage.setItem('token', res.token);
        this._loadingService.stop();
        /* Navigate to Home after registration */
        this._router.navigate(['home']);
      },
      (err) => {
        this.invalidFlag = true;
        console.error(err);
        this._loadingService.reset();
      }
    );
  }
}
