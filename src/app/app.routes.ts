import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Page1Component } from './page-1/page-1.component';
import { UserAccountComponent } from './user-account/user-account.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/scanning',
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/app/scanning',
      },
      {
        path: 'scanning',
        component: Page1Component,
      },
      {
        path: 'my-account',
        component: UserAccountComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/app/scanning' },
];
