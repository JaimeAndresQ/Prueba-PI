import { Component, OnInit,ElementRef, AfterViewChecked   } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import VanillaTilt from 'vanilla-tilt';

//interface de la carta
interface Carta {
  id_carta: string;
  activo: boolean;
  urlImagen: string;
  price: number;
  stock: number;
  nombre_carta: string;
  poder: string,
  vida:number,
  defensa:number,
  ataqueBase: number,
  danoMax: number
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})

export class ProductsPageComponent  implements OnInit, AfterViewChecked {

  //guardar cartas
  cartas: Carta[] = [];

  ///paginacion
  currentPage = 1;
  totalPages = 7;
  totalPagesArray: number[] = [];

  constructor(private http: HttpClient,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    )  {

    this.matIconRegistry.addSvgIcon(
      'carrito',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/shopping_cart.svg'),
    )
  this.matIconRegistry.addSvgIcon(
    'cartas',
    this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/cartaBorde.svg')
  )
  }

  ngOnInit(): void {
    this.generateTotalPagesArray();
    this.getCartasByPage(this.currentPage);
  }

  ngAfterViewChecked(){
    const elementosCarta = document.querySelectorAll('[data-tilt]');
    if (elementosCarta.length > 0) {
      elementosCarta.forEach((elemento: any) => {
        // Aplicar VanillaTilt a cada elemento
        VanillaTilt.init(elemento, {
          max: 15,
          speed: 500,
          perspective: 1000,
          scale: 1.1,
          transition: true,
          gyroscope: true,
        });
      });
    }
  }

  //generar los numeros
  generateTotalPagesArray(): void {
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  //obtener las cartas de la API
  getCartasByPage(pageNumber: number): void {
    //const apiUrl = `http://api-cartas-gama.thenexusbattles2.com:8002/api/cards/?page_number=${pageNumber}`;
    const apiUrl = `http://127.0.0.1:8000/api/cards/?page_number=${pageNumber}`;

    this.http.get<Carta[]>(apiUrl).subscribe(data => {
      this.cartas = data;
    });
    console.log(this.cartas)
  }

  //camiar de pagina
  changePageTo(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getCartasByPage(this.currentPage);
    }
  }

  //boton para agregar al carrito de compras
  addToCart(id_carta: string, price: number, nombre_carta: string) {
    // Realizar una solicitud HTTP para agregar la carta al carrito
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.error('No se ha encontrado el token de acceso.');
      return;
    }

    const cartEndpoint = 'http://localhost:3000/enviar-token';
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    });
    const requestData = { id_carta: id_carta, price: price, nombre_carta:nombre_carta };

    this.http.post(cartEndpoint, requestData, { headers }).subscribe(
        (response: any) => {
            // Manejar la respuesta del servicio de carrito si es necesario
            console.log('Cart response:', response);
        },
        (error) => {
            console.error('Error adding to cart:', error);
        }
    );
}

getCardBackgroundClass(id_carta: string): string {
  // Lógica para asignar una clase CSS en función del ID de la carta
  switch (id_carta) {
    case '64e5830109a1f203598f17f9':
    case '64e5830109a1f203598f17fa':
    case '64e5830109a1f203598f17fb':
    case '64e5830109a1f203598f17fc':
    case '64e5830109a1f203598f17fd':
    case '64e5830109a1f203598f17fe':
      return 'color-1';
    case '64e582f509a1f203598f17ed':
    case '64e582f509a1f203598f17ef':
      return 'color-2';
    case '64e582f509a1f203598f17ee':
      return 'color-3'
    case '64e582f509a1f203598f17f0':
      return 'color-4'
    case '64e582f509a1f203598f17f1':
      return 'color-5'
    case '64e582f509a1f203598f17f2':
      return 'color-6'
    case '64e582f509a1f203598f17f6':
      return 'color-7'
    default:
      return '';
  }
}
}