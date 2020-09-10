import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LangService } from '../lang.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public _authService: AuthService, private langService: LangService, private matDialog: MatDialog, private router: Router) {}
  languageChoice = new FormControl('');

  ngOnInit(): void {
    this.languageChoice.patchValue('english');
  }
  changeLanguage() {
    this.langService.changeLanguage(`${this.languageChoice.value}`);
  }

  logout() {
    let data: Object = { question: 'Are you sure?', submit: 'Logout' };
    let dialogRef = this.matDialog.open(ModalComponent, { data, height: '150px', width: '250px', panelClass: 'custom-modalbox' });
    dialogRef.afterClosed().subscribe((res: Boolean) => {
      if (res) {
        this._authService.logout();
        this.router.navigate(['thankyou']);
      } else return;
    });
  }
}
