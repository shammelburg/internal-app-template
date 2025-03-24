import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Page1Component } from './page-1/page-1.component';
import { Page2Component } from './page-2/page-2.component';
import { UserAccountComponent } from './user-account/user-account.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/page-1',
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/app/page-1',
      },
      {
        path: 'page-1',
        component: Page1Component,
      },
      {
        path: 'page-2',
        component: Page2Component,
      },
      {
        path: 'my-account',
        component: UserAccountComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/app/page-1' },
];
