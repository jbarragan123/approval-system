import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'requests', pathMatch: 'full' },

  {
    path: 'requests',
    loadComponent: () =>
      import('./pages/request-list/request-list').then(m => m.RequestListComponent)
  },
  {
    path: 'requests/new',
    loadComponent: () =>
      import('./pages/request-form/request-form').then(m => m.RequestFormComponent)
  },
  {
    path: 'requests/:id',
    loadComponent: () =>
      import('./pages/request-detail/request-detail').then(m => m.RequestDetailComponent)
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./pages/notifications/notifications').then(m => m.NotificationsComponent)
  },
];
