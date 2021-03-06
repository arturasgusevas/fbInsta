import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';

import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'sign-up', component: RegisterComponent},
  { path: 'sign-in', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'post/new', component: PostComponent, canActivate: [AuthGuard]},
  { path: 'post/:id', component: PostComponent, canActivate: [AuthGuard]},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
