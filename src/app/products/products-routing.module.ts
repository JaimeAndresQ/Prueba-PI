import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CharactersPageComponent } from './pages/products-page/categorias/personajes/personajes-page.component';
import { ItemsPageComponent } from './pages/products-page/categorias/items/items-page.component';
import { ArmorsPageComponent } from './pages/products-page/categorias/armaduras/armaduras-page.components';
import { GunsPageComponent } from './pages/products-page/categorias/armas/armas-page.component';
import { ProductDetailComponent } from './pages/products-page/cardDetail/product-detail.component';
import { EpicasPageComponent } from './pages/products-page/categorias/epicas/epicas-page.component';
import { SearchProductsPageComponent } from './pages/products-page/search-card.components';
import { DiscountPageComponent } from './pages/products-page/categorias/descuento/personajes-page.component';

const routes: Routes = [
  {
    path: 'productos-vitrina',
    component: ProductsPageComponent
  },
  {
    path: 'personajes',
    component: CharactersPageComponent
  },
  {
    path: 'armaduras',
    component: ArmorsPageComponent
  },
  {
    path: 'armas',
    component: GunsPageComponent
  },
  {
    path:'descuento',
    component: DiscountPageComponent
  },
  {
    path:'epicas',
    component: EpicasPageComponent
  },
  {
    path: 'items',
    component: ItemsPageComponent
  },
  {
    path:'search',
    component: SearchProductsPageComponent
  },
  {
    path:'carta/:Id',
    component: ProductDetailComponent
  },
  {
    path: '**',
    redirectTo: 'productos-vitrina',
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
