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
    selector: 'app-order',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.css']
})

export class OrderPageComponent implements OnInit {

    cartas: Carta[] = [];
    subtotal: number = 0;
    iva: number = 0;
    total: number = 0;

    constructor(private http: HttpClient) {
        this.cartas = []
    }
    
    ngOnInit(): void {
        
    }
}