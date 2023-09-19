import { Component, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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

    constructor(private http: HttpClient, private route: ActivatedRoute){
        this.carta = {}
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params)=>{
            const id_carta = params.get('id_carta');

            //const apiUrl = `http://104.40.5.117:8000/api/cardDetail/${id_carta}`;
            const apiUrl = `http://20.25.34.123:8000/api/cardDetail/${id_carta}`;
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
