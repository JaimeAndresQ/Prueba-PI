import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

//interface de la carta
interface Carta {
  id_carta: string;
  activo: boolean;
  urlImagen: string;
  price: number;
  stock: number;
  nombre_carta: string;
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})

export class ProductsPageComponent  implements OnInit{

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
  }

  //camiar de pagina
  changePageTo(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getCartasByPage(this.currentPage);
    }
  }

  //boton para agregar al carrito de compras
  addToCart(id_carta: string, price: number) {
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
    const requestData = { id_carta: id_carta, price: price };

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
}
