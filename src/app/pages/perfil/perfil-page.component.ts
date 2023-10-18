import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal/public_api';
import { CookieService } from 'ngx-cookie-service';

//interface de la carta
interface Perfil {
    user: string;
    sub: boolean;
    games: number;
    credits: number;
    name: string;
    last_name: string;
    email: string;
    img: string;
}

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil-page.component.html',
    styleUrls: ['./perfil-page.component.css']
})

export class ProfilePageComponent implements OnInit {
    public payPalConfig?: IPayPalConfig;

    perfil: any = {};
    informacionUsuario: any = {}

    constructor(private http: HttpClient,private cookieService: CookieService,) {
        this.perfil = {};
        this.informacionUsuario = {}
    }
    
    ngOnInit(): void {
        this.getUser();
        this.getUserInformation();
    }

    getUser(): void { 
        const accessToken = this.cookieService.get('access_token');

        if (!accessToken) {
            console.error('No se ha encontrado el token de acceso.');
            return;
        }

        const cartEndpoint ='https://webserver.thenexusbattles2.cloud/ver-perfil'
        //const cartEndpoint = 'http://localhost:3000/ver-perfil';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        });
    
        this.http.get<Perfil>(cartEndpoint,{ headers }).subscribe(
            (data: any) => {
                this.perfil = data
                console.log('Respuesta de la API:', data);
            },
            (error) => {
                console.error('Error al obtener el carrito de compras:', error);
            }
        );
    }

    getUserInformation(): void { 
        const accessToken = this.cookieService.get('access_token');

        if (!accessToken) {
            console.error('No se ha encontrado el token de acceso.');
            return;
        }

        const cartEndpoint ='https://webserver.thenexusbattles2.cloud/ver-informacion-perfil'
        //const cartEndpoint = 'http://localhost:3000/ver-informacion-perfil';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        });
    
        this.http.get<Perfil>(cartEndpoint,{ headers }).subscribe(
            (data: any) => {
                this.informacionUsuario = data
                console.log('Respuesta de la API:', data);
            },
            (error) => {
                console.error('Error al obtener el carrito de compras:', error);
            }
        );
    }

    deleteUser(user: string): void{
        const accessToken = this.cookieService.get('access_token');
    
        if (!accessToken) {
            console.error('No se ha encontrado el token de acceso.');
            return;
        }
    
        const cartEndpoint ='https://api.thenexusbattles2.cloud/login-api/api/requests/'
        //const cartEndpoint = 'http://127.0.0.1:8000/api/requests/';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        });
    
        const requestData = { user:user };
      
          this.http.post(cartEndpoint, requestData, { headers }).subscribe(
              (response: any) => {
                  // Manejar la respuesta del servicio de carrito si es necesario
                  console.log('delete response:', response);
              },
              (error) => {
                  console.error('Error delete user:', error);
              }
          );
      }
}