

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { CardProductsComponent } from './components/card-products/card-products.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { MatIconModule } from '@angular/material/icon';
import { CharactersPageComponent } from './pages/products-page/categorias/personajes/personajes-page.component';
import { ItemsPageComponent } from './pages/products-page/categorias/items/items-page.component';
import { ArmorsPageComponent } from './pages/products-page/categorias/armaduras/armaduras-page.components';
import { GunsPageComponent } from './pages/products-page/categorias/armas/armas-page.component';

@NgModule({
  declarations: [
    CardProductsComponent,
    ProductsPageComponent,
    CharactersPageComponent,
    ItemsPageComponent,
    ArmorsPageComponent,
    GunsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    MatIconModule,
  ],
  exports: [CardProductsComponent, ProductsPageComponent, CharactersPageComponent, ItemsPageComponent,ArmorsPageComponent, GunsPageComponent],
  providers: [],
})
export class ProductsModule { }

