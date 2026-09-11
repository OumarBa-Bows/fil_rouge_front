import { Routes } from '@angular/router';
import {authGuard} from '../../core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/admin-login').then(m => m.AdminLoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./admin')
        .then(m => m.Admin),
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./products/products')
            .then(m => m.ProductsComponent)
      },
      {
        path: 'categories',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./categories/categories')
            .then(m => m.CategoriesComponent)
      },
      {
        path: 'stock',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./stock/stock')
            .then(m => m.StockComponent)
      },
      {
        path: 'users',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./users/users')
            .then(m => m.UsersComponent)
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./roles/roles')
            .then(m => m.RolesComponent)
      }
    ]
  }
];
