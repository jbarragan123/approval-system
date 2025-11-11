import { Routes } from '@angular/router';
import { RequestListComponent } from './pages/request-list/request-list';
import { RequestFormComponent } from './pages/request-form/request-form';
import { RequestDetailComponent } from './pages/request-detail/request-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'requests', pathMatch: 'full' },
  { path: 'requests', component: RequestListComponent },
  { path: 'requests/new', component: RequestFormComponent },
  { path: 'requests/:id', component: RequestDetailComponent },
];
