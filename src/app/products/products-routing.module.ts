import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CharactersPageComponent } from './pages/products-page/categorias/personajes/personajes-page.component';
import { ItemsPageComponent } from './pages/products-page/categorias/items/items-page.component';
import { ArmorsPageComponent } from './pages/products-page/categorias/armaduras/armaduras-page.components';
import { GunsPageComponent } from './pages/products-page/categorias/armas/armas-page.component';
import { ProductDetailComponent } from './pages/products-page/cardDetail/product-detail.component';
import { TankPageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCarta-page.component';
import { GgunsPageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCartaArmas-page.component';
import { FirePageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCartaFuego-page.component';
import { IcePageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCartaHielo-page.component';
import { VenenoPageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCartaVeneno-page.component';
import { MachetePageComponent } from './pages/products-page/categorias/Tipo de carta/tipoCartaMachete-page.component';
import { EpicasPageComponent } from './pages/products-page/categorias/epicas/epicas-page.component';

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
    path: 'Pmachete',
    component: MachetePageComponent
  },
  {
    path: 'Pveneno',
    component: VenenoPageComponent
  },
  {
    path: 'Mhielo',
    component: IcePageComponent
  },
  {
    path: 'Mfuego',
    component: FirePageComponent
  },
  {
    path: 'Garmas',
    component: GgunsPageComponent
  },
  {
    path: 'Gtanque',
    component: TankPageComponent
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
