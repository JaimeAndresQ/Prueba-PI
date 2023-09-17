import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { SignupPageComponent } from './pages/registro/signup-page/signup-page.component';
import { ProductsPageComponent } from './products/pages/products-page/products-page.component';
import { CartPageComponent } from './pages/cart/cart-page.component';
import { PaymentPageComponent } from './pages/pagos/pagos-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: SignupPageComponent
  },
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'payment',
    component: PaymentPageComponent
  },
  {
    path: '',
    loadChildren: () => import('./products/products.module').then(module => module.ProductsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
