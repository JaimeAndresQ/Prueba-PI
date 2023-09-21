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
  clase:string,
  vida:number,
  tipo: string,
  defensa:number,
  ataqueBase: number,
  danoMax: number,
  coleccion: string,
  desc: string
}

@Component({
    selector: 'app-inventary',
    templateUrl: './inventary-page.component.html',
    styleUrls: ['./inventary-page.component.css']

})

export class InventaryPageComponent implements OnInit, AfterViewChecked {

    inventario: Inventary[] = [];

    // Variables Carrusel
    imagenActualIndex: number = 0;
    cartasAMostrar: number = 4;
    displayedImages: Inventary[] = [];

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
        this.updateDisplayedImages();
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


    prevImage(): void {
      this.imagenActualIndex = (this.imagenActualIndex - 1 + this.inventario.length) % this.inventario.length;
      this.updateDisplayedImages();
    }

    nextImage(): void {
      this.imagenActualIndex = (this.imagenActualIndex + 1) % this.inventario.length;
      this.updateDisplayedImages();
    }

    private updateDisplayedImages(): void {
      if (this.inventario.length < this.cartasAMostrar) {
        this.displayedImages = this.inventario;
      } else {
        const startIndex = this.imagenActualIndex;
        const endIndex = (this.imagenActualIndex + this.cartasAMostrar) % this.inventario.length;
        if (startIndex < endIndex) {
          this.displayedImages = this.inventario.slice(startIndex, endIndex);
        } else {
          this.displayedImages = this.inventario.slice(startIndex).concat(this.inventario.slice(0, endIndex));
        }
      }
    }


    getInventary(): void {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
          console.error('No se ha encontrado el token de acceso.');
          return;
      }

      const cartEndpoint ='https://store.thenexusbattles2.cloud/webserver/ver-inventario'
      //const cartEndpoint = 'http://localhost:3000/ver-inventario';
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
          const id_carta = item.id_carta
          const cartEndpoint =`https://store.thenexusbattles2.cloud/cards/api/cardDetail/${id_carta}`;
          //const cartEndpoint = `http://127.0.0.1:8000/api/cardDetail/${id_carta}`;
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
}