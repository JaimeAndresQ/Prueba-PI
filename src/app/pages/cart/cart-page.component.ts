import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

//interface de la carta
interface Carta {
    id_carta: string;
    activo: boolean;
    urlImagen: string;
    price: number;
    quantity: number;
    nombre_carta: string;
}


@Component({
    selector: 'app-cart',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.css']
})


export class CartPageComponent implements OnInit {
    // Guardar cartas
    cartas: Carta[] = [];
    subtotal: number = 0;
    iva: number = 0;
    total: number = 0;
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.getCartas();
    }

    // Obtener las cartas del carrito del usuario
    getCartas(): void { 
      // Realizar una solicitud HTTP para agregar la carta al carrito
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        console.error('No se ha encontrado el token de acceso.');
        return;
      }

      const cartEndpoint = 'http://localhost:3000/obtener-carrito';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      });
  
      this.http.get<Carta[]>(cartEndpoint,{ headers }).subscribe(
        (data: Carta[]) => {
          this.cartas = data;
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