import { Routes } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: TripListComponent },
];
