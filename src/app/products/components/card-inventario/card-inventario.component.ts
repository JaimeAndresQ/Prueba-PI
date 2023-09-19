import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'card-inventario',
  templateUrl: './card-inventario.component.html',
  styleUrls: ['./card-inventario.component.css']
})
export class CardInventarioComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {

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


