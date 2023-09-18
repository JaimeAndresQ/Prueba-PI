import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './products/products.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CartPageComponent } from './pages/cart/cart-page.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { SignupPageComponent } from './pages/registro/signup-page/signup-page.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaymentPageComponent } from './pages/pagos/pagos-page.component';
import { OrderPageComponent } from './pages/order/order-page.component';
import { ProfilePageComponent } from './pages/perfil/perfil-page.component';
import { InventaryPageComponent } from './pages/inventario/inventary-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    CartPageComponent,
    PaymentPageComponent,
    OrderPageComponent,
    ProfilePageComponent,
    InventaryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NoopAnimationsModule,
    MatIconModule,
    HttpClientModule,
    ProductsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPayPalModule
  ],
  exports: [MatIconModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
