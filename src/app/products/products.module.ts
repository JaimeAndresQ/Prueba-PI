

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { CardProductsComponent } from './components/card-products/card-products.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CardProductsComponent,
    ProductsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    MatIconModule,
  ],
  exports: [CardProductsComponent, ProductsPageComponent],
  providers: [],
})
export class ProductsModule { }

