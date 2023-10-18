import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ModalService } from 'src/app/shared/services/modal.service';


//componentes que se utilizaran como templates y estilos
@Component({
    selector: 'app-login',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})


//creamos el componente del login
export class LoginPageComponent implements OnInit{

    //definimos el formulario
    public loginForm: FormGroup;

    //Definimos el error custom
    showCustomError: boolean = false;


    //este constructor define los metodos a usar
    constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private cookieService: CookieService, private modalService: ModalService){
        //inicializamos el formulario
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['',Validators.required]
        })
    }


    openModal(modalTemplate:TemplateRef<any>){
      this.modalService.open(modalTemplate, {size: 'lg', title:''})
      .subscribe((action) => {
        console.log('ModalAction', action)
      })
    }

    getErrorMessage() {
      const control = this.loginForm.get("username");

      if (this.showCustomError) {
        if (control?.hasError('required')) {
          return `Puede que tu nombre de usuario o contraseña sean incorrectos. Por favor, asegúrese de que ha ingresado la información adecuada en los campos correspondientes.`;
        }
      }
      return '';
    }


    ngOnInit(): void {}

    onSubmit(){
        if (this.loginForm.valid){
            //obtenemos los datos del formulario
            const formData = this.loginForm.value;

            //creamos los objectos con los datos de la peticion
            const loginData = {
                username: formData.username,
                password: formData.password
            };

            //este es el encabezado de la peticion
            const headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });

            //hacer la peticion al servidor para poder mandar los datos del login
            //y recibir los tokens
            //https://api.thenexusbattles2.cloud/login-api/api/token/ || http://127.0.0.1:8002/api/token/
            this.http.post('https://api.thenexusbattles2.cloud/ldap/api/token/', loginData, { headers }).subscribe(
                (response: any) => {
                    //almacenamos los tokens de access y refresh
                    this.cookieService.set('access_token', response.access,undefined,'/','.thenexusbattles2.cloud',true, 'Lax');
                    //this.cookieService.set('access_token', response.access,undefined,'/','localhost',true, 'Lax');
                    localStorage.setItem('refresh_token', response.refresh);
                    localStorage.setItem('username',formData.username);

                    //redirigir al usuario
                    this.router.navigate(['/productos-vitrina']);

                    //imprimimos los tokens para verificar que funcionen
                    console.log('access_token:', response.access);
                    console.log('refresh_token:', response.refresh);
                    console.log('Username:', formData.username);
                },
                //callback para manejar errores
                (error) => {
                    console.error('Error', error);

                    // Restablecer el formulario para borrar los datos incorrectos
                    this.loginForm.reset();

                    // Mostrar el controlador error personalizado en verdadero
                    this.showCustomError = true;


                }
            )
        }
    }
}
