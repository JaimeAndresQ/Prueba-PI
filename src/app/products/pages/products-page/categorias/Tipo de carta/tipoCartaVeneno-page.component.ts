import { Component, OnInit,ElementRef, AfterViewChecked   } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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

@Component({
    selector: 'app-tipoV-page',
    templateUrl: '../../products-page.component.html',
    styleUrls: ['../../products-page.component.css']
})

export class VenenoPageComponent  implements OnInit, AfterViewChecked {

  //guardar cartas
    cartas: Carta[] = [];

  ///paginacion
    currentPage = 1;
    totalPages = 7;
    totalPagesArray: number[] = [];
    maxVisiblePages: number = 2;
    pagesToShow: number = 5;


    constructor(private http: HttpClient,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    )  {

        this.matIconRegistry.addSvgIcon(
            'carrito',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/shopping_cart.svg'),
          )
          this.matIconRegistry.addSvgIcon(
            'cartas',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/cartaBorde.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'favorito',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/favorite.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'añadir_carrito',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/add_shop.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'add',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/add.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'remove',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/remove.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'trash',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/trash.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'flecha_derecha',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/nav_right.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'flecha_izquierda',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/nav_left.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'personaje',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/personaje.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'items',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/items.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'sword',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/sword.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'armor',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/armor2.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'descuento',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/descuento.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'tanque',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/tanque.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'axe',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/axe.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'magofuego',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/magofuego.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'magohielo',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/magohielo.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'picaroveneno',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/picaroveneno.svg')
          )
          this.matIconRegistry.addSvgIcon(
            'picaromachete',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/picaromachete.svg')
          )
    }

    ngOnInit(): void {
        this.getTipeByPage(this.currentPage);
    }

    ngAfterViewChecked(){
    const elementosCarta = document.querySelectorAll('[data-tilt]');
    if (elementosCarta.length > 0) {
        elementosCarta.forEach((elemento: any) => {
        // Aplicar VanillaTilt a cada elemento
        VanillaTilt.init(elemento, {
            max: 15,
            speed: 500,
            perspective: 1000,
            scale: 1.1,
            transition: true,
            gyroscope: true,
        });
        });
    }
    }

    //generar los numeros
    generateTotalPagesArray(): void {
    // Calcula la página central en función del número total de páginas
    const middlePage = Math.ceil(this.pagesToShow / 2);

    // Calcula el inicio y el fin del rango de páginas visibles
    let start = this.currentPage - middlePage + 1;
    let end = this.currentPage + middlePage - 1;

    // Ajusta los valores de inicio y fin según los límites
    if (start < 1) {
        start = 1;
        end = Math.min(this.totalPages, this.pagesToShow);
    } else if (end > this.totalPages) {
        end = this.totalPages;
        start = Math.max(1, this.totalPages - this.pagesToShow + 1);
    }

    this.totalPagesArray = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }


  //obtener las cartas de la API
    getTipeByPage(pageNumber: number): void {
    //const apiUrl = `http://api-cartas-gama.thenexusbattles2.com:8002/api/cards/?page_number=${pageNumber}`;
    const apiUrl = `https://store.thenexusbattles2.cloud/cards/api/Veneno/`;

    this.http.get<Carta[]>(apiUrl).subscribe(data => {
        this.cartas = data;
    });
    console.log(this.cartas)
    }

  //camiar de pagina
    changePageTo(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.generateTotalPagesArray(); // Actualiza las páginas visibles
        this.getTipeByPage(this.currentPage);
    }
}



  //boton para agregar al carrito de compras
    addToCart(Id: string, Precio: number,Nombre: string) {
    // Realizar una solicitud HTTP para agregar la carta al carrito
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        console.error('No se ha encontrado el token de acceso.');
        return;
    }

    const cartEndpoint = 'https://store.thenexusbattles2.cloud/webserver/enviar-token';
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    });
    const requestData = { id_carta: Id, price: Precio,nombre_carta: Nombre };

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

get visiblePages(): number[] {
    const start = Math.max(1, this.currentPage - this.maxVisiblePages);
    const end = Math.min(this.totalPages, this.currentPage + this.maxVisiblePages);

    const visiblePages = [];
    for (let i = start; i <= end; i++) {
    visiblePages.push(i);
    }

    return visiblePages;
}

// Cambia de página hacia adelante o hacia atrás
public changePage(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage;
        this.getTipeByPage(this.currentPage);
    }
}

}