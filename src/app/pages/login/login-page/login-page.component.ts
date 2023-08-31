import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';


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

    //este constructor define los metodos a usar
    constructor(private fb: FormBuilder, private http: HttpClient, private router: Router){
        //inicializamos el formulario
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['',Validators.required]
        })
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
            this.http.post('http://login.thenexusbattles2.com:8001/api/token/', loginData, { headers }).subscribe(
                (response: any) => {
                    //almacenamos los tokens de access y refresh
                    localStorage.setItem('access_token', response.access);
                    localStorage.setItem('refresh_token', response.refresh);

                    //redirigir al usuario
                    this.router.navigate(['/products']);

                    //imprimimos los tokens para verificar que funcionen
                    console.log('access_token:', response.access);
                    console.log('refresh_token:', response.refresh);
                    console.log('Username:', formData.username);
                },
                //callback para manejar errores
                (error) => {
                    console.error('Error', error);
                }
            )
        }
    }
}
