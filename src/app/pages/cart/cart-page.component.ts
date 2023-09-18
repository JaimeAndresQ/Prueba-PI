import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { WebsocketService } from './websocket.service';
import { Router  } from '@angular/router';

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
  
    constructor(private http: HttpClient, private websocketService: WebsocketService, private router: Router ) {
      this.cartas = []
    }
  
    ngOnInit(): void {
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

    addToCart(id_carta: string, price: number, nombre_carta: string) {
      // Realizar una solicitud HTTP para agregar la carta al carrito
      const accessToken = localStorage.getItem('access_token');
  
      if (!accessToken) {
        console.error('No se ha encontrado el token de acceso.');
        return;
      }

      //const cartEndpoint ='https://store.thenexusbattles2.com/websocket/enviar-token'
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

  removeToCart(id_carta: string) {
    // Realizar una solicitud HTTP para agregar la carta al carrito
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.error('No se ha encontrado el token de acceso.');
      return;
    }

    //const cartEndpoint ='https://store.thenexusbattles2.com/websocket/remover-carta'
    const cartEndpoint = 'http://localhost:3000/remover-carta';
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    });
    const requestData = { id_carta: id_carta};

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

  deleteToCart(id_carta: string) {
    // Realizar una solicitud HTTP para agregar la carta al carrito
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.error('No se ha encontrado el token de acceso.');
      return;
    }

    //const cartEndpoint ='https://store.thenexusbattles2.com/websocket/borrar-carta'
    const cartEndpoint = 'http://localhost:3000/borrar-carta';
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    });
    const requestData = { id_carta: id_carta};

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

  CreateOrder(){
    // Realizar una solicitud HTTP para crear la orden
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.error('No se ha encontrado el token de acceso.');
      return;
    }

    //const cartEndpoint ='https://store.thenexusbattles2.com/websocket/borrar-carta'
    const cartEndpoint = 'http://localhost:3000/crear-orden';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    this.http.post(cartEndpoint,{}, { headers }).subscribe(
      (response: any) => {
          // Manejar la respuesta del servicio de carrito si es necesario
          console.log('Cart response:', response);
          const orderID = response.order.order_id
          this.router.navigate(['/order', orderID]);
      },
      (error) => {
          console.error('Error adding to cart:', error);
      }
  );
}

    calcular(): void{
      this.subtotal = this.cartas.reduce((acc,carta) => acc + (carta.price * carta.quantity), 0);
      this.iva = this.subtotal*0.19;
      this.total = this.iva+this.subtotal;
    }
}
