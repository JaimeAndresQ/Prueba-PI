import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

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
}
