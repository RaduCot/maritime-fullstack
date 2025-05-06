import { Routes } from '@angular/router';
import { MaritimeDashboardComponent } from '../maritime-dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: MaritimeDashboardComponent }, // Default route
  { path: '**', redirectTo: '' } // Redirect unknown routes to the default route
];