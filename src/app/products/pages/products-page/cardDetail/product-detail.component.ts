import { Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import VanillaTilt from 'vanilla-tilt';

//interface de la carta
interface Carta {
  _id: string;
  estado: boolean;
  imagen: string;
  precio: number;
  stock: number;
  nombre: string;
  poder: string,
  vida:number,
  defensa:number,
  ataqueBase: number,
  dano: number,
  coleccion: string,
  descripcion: string
}

interface Comment {
  idcomentarioscartas: number;
  comentariosTexto: string;
  comentariosImg: string;
  comentariosFecha: Date;
}

@Component({
    selector: 'app-products-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent  implements OnInit{
    carta: any = {};

    comments: Comment[] = [];

    constructor(private http: HttpClient,
      private route: ActivatedRoute,
      private cookieService: CookieService,
){
        this.carta = {};
        this.comments = [];


    }


    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        const Id = params.get('Id');
    
        const apiUrl = `https://cards.thenexusbattles2.cloud/api/cartas/${Id}`;
        this.http.get(apiUrl).subscribe((data: any) => { // Usamos 'any' para el tipo de la respuesta.
          // Mapeamos 'daño' a 'dano' en la respuesta antes de asignarla a 'this.carta'
          this.carta = {
            ...data,
            dano: data.daño
          };
          console.log('Respuesta de la API:', data);
        },
        (error) => {
          console.error('Error al obtener la carta:', error);
        });
      });
    
      this.getComments();
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

    getComments(): void{
      this.route.paramMap.subscribe((params)=>{
        const Id = params.get('Id');
        const apiUrl = `https://store.thenexusbattles2.cloud/comentarios/api/comentariosCartas/${Id}`;
        //const apiUrl = `http://alpha.bucaramanga.upb.edu.co:3000/api/comentariosCartas/1`;
        this.http.get<Comment[]>(apiUrl).subscribe(
            (data) => {
              this.comments = data;
                console.log('Respuesta de la API:', data);
            },
            (error) => {
                console.error('Error al obtener el carrito de compras:', error);
            }
        );
      })
    }

}
