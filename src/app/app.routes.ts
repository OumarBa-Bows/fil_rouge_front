import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/home/home')
        .then(m => m.Home)
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./features/public/products/Products')
        .then(m => m.Products)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes')
        .then(m => m.routes)
  },


 /* {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/product-details.component')
        .then(m => m.ProductDetailsComponent)
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component')
        .then(m => m.CartComponent)
  }*/
];
