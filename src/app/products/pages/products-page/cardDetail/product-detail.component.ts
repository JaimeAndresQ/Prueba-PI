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
    danoMax: number
}

@Component({
    selector: 'app-products-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent  implements OnInit{
    carta: any = {};

    constructor(private http: HttpClient,
      private route: ActivatedRoute,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer){
        this.carta = {}

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
    }


    ngOnInit(): void {
        this.route.paramMap.subscribe((params)=>{
            const id_carta = params.get('id_carta');

            //const apiUrl = `http://104.40.5.117:8000/api/cardDetail/${id_carta}`;
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
    }

}
