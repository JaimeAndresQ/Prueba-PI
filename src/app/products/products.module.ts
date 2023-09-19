

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
import { ProductDetailComponent  } from './pages/products-page/cardDetail/product-detail.component';
import { TankPageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCarta-page.component';
import { GgunsPageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCartaArmas-page.component';
import { FirePageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCartaFuego-page.component';
import { IcePageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCartaHielo-page.component';
import { VenenoPageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCartaVeneno-page.component';
import { MachetePageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCartaMachete-page.component';
import { CardInventarioComponent } from './components/card-inventario/card-inventario.component';

@NgModule({
  declarations: [
    CardProductsComponent,
    CardInventarioComponent,
    ProductsPageComponent,
    CharactersPageComponent,
    ItemsPageComponent,
    ArmorsPageComponent,
    GunsPageComponent,
    ProductDetailComponent,
    TankPageComponent,
    GgunsPageComponent,
    FirePageComponent,
    IcePageComponent,
    VenenoPageComponent,
    MachetePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    MatIconModule,
  ],
  exports: [CardProductsComponent, ProductsPageComponent, CharactersPageComponent, ItemsPageComponent,ArmorsPageComponent, GunsPageComponent,ProductDetailComponent, CardInventarioComponent],
  providers: [],
})
export class ProductsModule { }

