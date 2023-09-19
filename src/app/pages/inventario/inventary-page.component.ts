import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal/public_api';
import VanillaTilt from 'vanilla-tilt';

//interface de la carta
interface Inventary {
    user: string;
    id_carta: string;
    carta: Carta;
}

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
    selector: 'app-inventary',
    templateUrl: './inventary-page.component.html',
    styleUrls: ['./inventary-page.component.css']

})

export class InventaryPageComponent implements OnInit, AfterViewChecked {

    inventario: Inventary[] = [];

    public images: string[] = [
      "../../../assets/images/carta.png",
      "../../../assets/images/caballero.png",
      "../../../assets/images/caballero2.png",
    ];

    // Variables Carrusel
    imagenActualIndex: number = 0;
    cartasAMostrar: number = 4;
    displayedImages: string[] = [];

    constructor(private http: HttpClient,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer) {
        this.matIconRegistry.addSvgIcon(
          'flecha_derecha',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/nav_right.svg')
        )
        this.matIconRegistry.addSvgIcon(
          'flecha_izquierda',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/nav_left.svg')
        )

        this.inventario = [];
    }

    ngOnInit(): void {
        this.getInventary();
    }

    ngAfterViewChecked(){
      const elementosCarta = document.querySelectorAll('[data-tilt]');
      if (elementosCarta.length > 0) {
        elementosCarta.forEach((elemento: any) => {
          // Aplicar VanillaTilt a cada elemento
          VanillaTilt.init(elemento, {
            max: 10,
            speed: 500,
            perspective: 1000,
            scale: 1.1,
            transition: true,
            gyroscope: true,
          });
        });
      }
    }

    getInventary(): void {
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            console.error('No se ha encontrado el token de acceso.');
            return;
        }

        //const cartEndpoint ='https://store.thenexusbattles2.com/websocket/obtener-carrito'
        const cartEndpoint = 'http://localhost:3000/ver-inventario';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        });

        this.http.get<Inventary[]>(cartEndpoint,{ headers }).subscribe(
            (data: Inventary[]) => {
                this.inventario = data
                console.log('Respuesta de la API:', data);
                this.getCards();
            },
            (error) => {
                console.error('Error al obtener el carrito de compras:', error);
            }
        );
    }

    getCards(): void {
        for (const item of this.inventario){
            //const cartEndpoint ='https://store.thenexusbattles2.com/websocket/obtener-carrito'
            const id_carta = item.id_carta
            const cartEndpoint = `http://127.0.0.1:8000/api/cardDetail/${id_carta}`;
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
            });

            this.http.get<Carta>(cartEndpoint,{ headers }).subscribe(
                (carta: Carta) => {
                    item.carta = carta
                    console.log('Respuesta de la API:', carta);
                },
                (error) => {
                    console.error('Error al obtener el carrito de compras:', error);
                }
            );
        }

    }

    prevImage(): void {
      this.imagenActualIndex = (this.imagenActualIndex - 1 + this.images.length) % this.images.length;
      this.updateDisplayedImages();
    }

    nextImage(): void {
      this.imagenActualIndex = (this.imagenActualIndex + 1) % this.images.length;
      this.updateDisplayedImages();
    }

    private updateDisplayedImages(): void {
      if (this.images.length < this.cartasAMostrar) {
        this.displayedImages = this.images;
      } else {
        const startIndex = this.imagenActualIndex;
        const endIndex = (this.imagenActualIndex + this.cartasAMostrar) % this.images.length;
        if (startIndex < endIndex) {
          this.displayedImages = this.images.slice(startIndex, endIndex);
        } else {
          this.displayedImages = this.images.slice(startIndex).concat(this.images.slice(0, endIndex));
        }
      }
    }

}
