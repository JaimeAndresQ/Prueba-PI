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

export class InventaryPageComponent implements OnInit {

    inventario: Inventary[] = [];


    constructor(private http: HttpClient,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer) {

        this.inventario = [];
    }

    ngOnInit(): void {
        this.getInventary();
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
                console.log('inventario',this.inventario)
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

}