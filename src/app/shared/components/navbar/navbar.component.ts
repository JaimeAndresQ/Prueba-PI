import { Component, OnInit } from '@angular/core';
import { MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { WebsocketService } from 'src/app/pages/cart/websocket.service';


//interface de la carta
interface Carta {
  id_carta: string;
  urlImagen: string;
  price: number;
  quantity: number;
}


@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  title = 'custom icons';

  usuarioHaIniciadoSesion: boolean = false;
  nombreUsuario: string = '';
  cartas: Carta[] = [];
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private http: HttpClient, 
    private websocketService: WebsocketService
  ) {
    this.matIconRegistry.addSvgIcon(
      'carrito',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/shopping_cart.svg'),
    );
    this.cartas = []
  }

  ngOnInit() {
    // Comprobar si existe un token de acceso en el localStorage
    const token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username')

    if (token) {
      this.nombreUsuario = username || '';
      this.usuarioHaIniciadoSesion = true;
    };
    
    this.getCartas();

    this.websocketService.listen('cartUpdated').subscribe((data: Carta[] | Carta) => {
      if (Array.isArray(data)) {
        this.cartas = data;
      } else {
        this.cartas = [data]
      }
      this.calcular();
    });
  }

  // Obtener las cartas del carrito del usuario
  getCartas(): void { 
    // Realizar una solicitud HTTP para agregar la carta al carrito
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.error('No se ha encontrado el token de acceso.');
      return;
    }

    //const cartEndpoint ='https://store.thenexusbattles2.com/websocket/obtener-carrito'
    const cartEndpoint = 'http://localhost:3000/obtener-carrito';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    this.http.get<Carta[]>(cartEndpoint,{ headers }).subscribe(
      (data: Carta[] | Carta) => {
        if (Array.isArray(data)){
          this.cartas = data;
        }else{
          this.cartas = [data]
        }
        this.calcular();
        console.log('Respuesta de la API:', data); // Imprimir la respuesta por consola
      },
      (error) => {
        console.error('Error al obtener el carrito de compras:', error);
      }
    );
  }

  calcular(): void{
    this.subtotal = this.cartas.reduce((acc,carta) => acc + carta.price, 0);
    this.iva = this.subtotal*0.19;
    this.total = this.iva+this.subtotal;
  }

}
