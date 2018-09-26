import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { ListErrorsComponent } from '~shared/list-errors/list-errors.component';
//import { UserService } from '~services';

const authRouting: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent
    // canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(authRouting)
  ],
  declarations: [
    AuthComponent,
    ListErrorsComponent
  ],
  exports: [RouterModule],
  providers: [
    NoAuthGuard,
    //UserService
  ]
})
export class AuthModule {}
