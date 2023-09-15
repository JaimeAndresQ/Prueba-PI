import { Component, OnInit } from '@angular/core';
import { MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'custom icons';

  usuarioHaIniciadoSesion: boolean = false;
  nombreUsuario: string = '';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'carrito',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/shopping_cart.svg'),
    )
    this.matIconRegistry.addSvgIcon(
      'trash',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/trash.svg'),
    )
  }

  ngOnInit() {
    // Comprobar si existe un token de acceso en el localStorage
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username')

    if (token) {
      this.nombreUsuario = username || '';
      this.usuarioHaIniciadoSesion = true;
    }
  }
}
