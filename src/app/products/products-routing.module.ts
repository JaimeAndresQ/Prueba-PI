import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CharactersPageComponent } from './pages/products-page/categorias/personajes/personajes-page.component';
import { ItemsPageComponent } from './pages/products-page/categorias/items/items-page.component';
import { ArmorsPageComponent } from './pages/products-page/categorias/armaduras/armaduras-page.components';
import { GunsPageComponent } from './pages/products-page/categorias/armas/armas-page.component';

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
    path: 'items',
    component: ItemsPageComponent
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
