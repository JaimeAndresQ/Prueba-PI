import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { SignupPageComponent } from './pages/registro/signup-page/signup-page.component';
import { ProductsPageComponent } from './products/pages/products-page/products-page.component';
import { CartPageComponent } from './pages/cart/cart-page.component';
import { PaymentPageComponent } from './pages/pagos/pagos-page.component';
import { OrderPageComponent } from './pages/order/order-page.component';
import { ProfilePageComponent } from './pages/perfil/perfil-page.component';
import { InventaryPageComponent } from './pages/inventario/inventary-page.component';


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
    path: 'order/:orderId',
    component: OrderPageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: 'banco',
    component: InventaryPageComponent
  },
  {
    path: 'payment',
    component: ProfilePageComponent
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
