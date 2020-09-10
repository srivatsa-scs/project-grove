import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { RouterOutlet } from '@angular/router';
import { fader, slider } from './route-animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // slider,
    fader,
  ],
})
export class AppComponent {
  title = 'Project Grove';
  constructor(public _authService: AuthService) {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
