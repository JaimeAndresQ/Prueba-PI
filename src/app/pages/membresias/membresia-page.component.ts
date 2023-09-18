import { Component, OnInit,ElementRef, AfterViewChecked   } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

//interface de la carta
interface Carta {
    id_carta: string;
    img: string;
    games: number;
    price: number;
    title: string;
    sub: boolean;
}

@Component({
    selector: 'app-membresia-page',
    templateUrl: './membresia-page.component.html',
    styleUrls: ['./membresia-page.component.css']
})

export class MembershipPageComponent  implements OnInit{

    //guardar cartas
    cartas: Carta[] = [];

    constructor(private http: HttpClient,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    )  {}

    ngOnInit(): void {
        this.getCartas();
    }

  //obtener las cartas de la API
    getCartas(): void {
    //const apiUrl = `http://104.40.5.117:8000/api/cards/?page_number=${pageNumber}`;
    const apiUrl = `http://127.0.0.1:8000/api/membership/`;

    this.http.get<Carta[]>(apiUrl).subscribe(data => {
        this.cartas = data;
    });
    console.log(this.cartas)
    }

/*
getCardBackgroundClass(id_carta: string): string {
  // Lógica para asignar una clase CSS en función del ID de la carta
switch (id_carta) {
    case '64e5830109a1f203598f17fe':
        return 'color-1';
    default: 
        return '';
}
}*/


}

