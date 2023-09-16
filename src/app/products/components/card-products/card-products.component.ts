import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductsPageComponent } from '../../pages/products-page/products-page.component';

@Component({
  selector: 'card-products',
  templateUrl: './card-products.component.html',
  styleUrls: ['./card-products.component.css']
})
export class CardProductsComponent {
  constructor(
    private productComponent: ProductsPageComponent,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.productComponent = productComponent;

    this.matIconRegistry.addSvgIcon(
      'carrito',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/shopping_cart.svg'),
    )
  this.matIconRegistry.addSvgIcon(
    'cartas',
    this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/cartaBorde.svg')
  )
  }

}


