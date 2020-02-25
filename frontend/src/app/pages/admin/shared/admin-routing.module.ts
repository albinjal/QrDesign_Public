import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {AdminDashboardComponent} from '../dashboard/dashboard.component';
import {canActivate} from '@angular/fire/auth-guard';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', canActivateChild: [AuthGuard], children: [
      {path: '', component: AdminDashboardComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
