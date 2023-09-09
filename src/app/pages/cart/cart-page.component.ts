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
    stock: number;
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
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.getCartas();
    }
  
    // Obtener las cartas del carrito del usuario
    getCartas(): void { 
      const usuario = 'Administrador'; // Usuario para la solicitud GET de prueba
  
      this.http.get<Carta[]>(`http://127.0.0.1:8000/api/cart/${usuario}`).subscribe(
        (data: Carta[]) => {
          this.cartas = data;
          console.log('Respuesta de la API:', data); // Imprimir la respuesta por consola
        },
        (error) => {
          console.error('Error al obtener el carrito de compras:', error);
        }
      );
    }
  }