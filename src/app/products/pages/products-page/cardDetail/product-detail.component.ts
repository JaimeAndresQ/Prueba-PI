import { Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
    poder: string,
    vida:number,
    defensa:number,
    ataqueBase: number,
    danoMax: number,
    tipo:string,
    coleccion:string,
    desc:string
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

    comments: any = [];

    constructor(private http: HttpClient,
      private route: ActivatedRoute,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer){
        this.carta = {};
        this.comments = [];

        this.matIconRegistry.addSvgIcon(
          'precio',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/precio.svg'),
        )
        this.matIconRegistry.addSvgIcon(
          'ataquebase',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/ataquebase.svg'),
        )
        this.matIconRegistry.addSvgIcon(
          'dañomax',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/dañomax.svg'),
        )
        this.matIconRegistry.addSvgIcon(
          'ataquedado',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/ataquedado.svg'),
        )
        this.matIconRegistry.addSvgIcon(
          'defensa',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/defensa.svg'),
        )
        this.matIconRegistry.addSvgIcon(
          'vida',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/vida.svg'),
        )
        this.matIconRegistry.addSvgIcon(
          'efecto',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/efecto.svg'),
        )
        this.matIconRegistry.addSvgIcon(
          'turnos',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/turnos.svg'),
        )
        this.matIconRegistry.addSvgIcon(
          'estadistica',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/estadistica.svg'),
        )
        this.matIconRegistry.addSvgIcon(
          'stock',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/stock.svg'),
        )
    }


    ngOnInit(): void {
        this.route.paramMap.subscribe((params)=>{
            const id_carta = params.get('id_carta');

            //const apiUrl = `http://127.0.0.1:8000/api/cardDetail/${id_carta}`;
            const apiUrl = `https://store.thenexusbattles2.cloud/cards/api/cardDetail/${id_carta}`;
            this.http.get<Carta>(apiUrl).subscribe(
                (data: any) => {
                    this.carta = data
                    console.log('Respuesta de la API:', data);
                },
                (error) => {
                    console.error('Error al obtener el carrito de compras:', error);
                }
            );
        })
        this.getComments();
    }

    getComments(): void{
      //const apiUrl = `http://127.0.0.1:8000/api/cardDetail/${id_carta}`;
      const apiUrl = `http://alpha.bucaramanga.upb.edu.co:3000/api/comentariosCartas/1`;
      this.http.get<Comment>(apiUrl).subscribe(
          (data: any) => {
              console.log('Respuesta de la API:', data);
          },
          (error) => {
              console.error('Error al obtener el carrito de compras:', error);
          }
      );
    }

}
