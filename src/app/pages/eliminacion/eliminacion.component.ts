import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-eliminacion',
  templateUrl: './eliminacion.component.html',
  styleUrls: ['./eliminacion.component.css']
})

export class EliminacionComponent implements OnInit{

  constructor(
    private http: HttpClient,private cookieService: CookieService
  ){}

  ngOnInit(): void {

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
