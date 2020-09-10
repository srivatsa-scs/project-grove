import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilytreeComponent } from './familytree/familytree.component';
import { HomeComponent } from './home/home.component';
import { RelationsComponent } from './relations/relations.component';
import { NewrelationComponent } from './newrelation/newrelation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { PersonComponent } from './person/person.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PasswordComponent } from './password/password.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { animation: 'isLeft' },
  },
  {
    path: 'addrelation',
    component: NewrelationComponent,
    canActivate: [AuthGuard],
    data: { animation: 'isLeft' },
  },
  {
    path: 'findrelation',
    component: RelationsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'isRight' },
  },
  {
    path: 'familytree',
    component: FamilytreeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'person',
    component: PersonComponent,
    canActivate: [AuthGuard],
    data: { animation: 'isRight' },
  },
  {
    path: 'changepass',
    component: PasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'thankyou',
    component: ThankyouComponent,
    data: { animation: 'isRight' },
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { animation: 'isRight' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
