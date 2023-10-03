import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importa jQuery y Select2
declare var $: any;

@Component({
  selector: 'signup-component',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})


export class SignupPageComponent implements OnInit {
  errorMessages = {
    username: [
      { type: 'required', message: 'Username is required' },
    ],
    name: [
      { type: 'required', message: 'Name is required' },
    ],
    last_name: [
      { type: 'required', message: 'Last name is required' },
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Invalid email format' },
    ],
    img: [
      { type: 'required', message: 'Image is required' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'invalidPassword', message: 'Invalid password format' },
    ],
    question: [
      { type: 'required', message: 'Security question is required' },
    ],
    answer: [
      { type: 'required', message: 'Answer is required' },
    ],
  };

  registerForm: FormGroup;
  hide = true;
  selectedQuestion: boolean = false;
  securityQuestions = [
    { value: 'mother', label: '¿Cómo se llama tu madre?' },
    { value: 'father', label: '¿Cómo se llama tu padre?' },
    { value: 'siblings', label: '¿Cuántos hermanos tienes?' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      img: ['', Validators.required,],
      password: ['', Validators.compose([
        Validators.required,
        this.passwordValidator // Agregar la validación personalizada aquí
      ])],
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });



  }



  getErrorMessage(fieldName: string) {
    const control = this.registerForm.get(fieldName);

    if (control?.hasError('required')) {
      if (fieldName == "email") {
        return `Correo es obligatorio`;
      }
      if (fieldName == "name") {
        return `Nombre es obligatorio`;
      }
      if (fieldName == "last_name") {
        return `Apellido es obligatorio`;
      }
      if (fieldName == "password") {
        return `Contraseña es obligatoria`;
      }
      if (fieldName == "img") {
        return `Debes escoger un avatar obligatorio`;
      }
      if (fieldName == "username") {
        return `Debes eligir un nickname obligatorio`;
      }
      if (fieldName == "question") {
        return `Tienes que eligir una pregunta de seguridad`;
      }
      if (fieldName == "answer") {
        if (!control?.hasError('question')) {
          return `Tienes que responder la pregunta`;
        }
      }
      else
      {
        return `${fieldName} es obligatorio`;
      }
    }

    if (control?.hasError('email')) {
      return 'Formato invalido de correo';
    }

    if (control?.hasError('invalidPassword')) {
      return 'La contraseña debe contener al menos una mayúscula, una minúscula, un número, un símbolo y ser mayor a 8 caracteres.';
    }

    return '';

  }

  getErrorMessageSelect(fieldName: string) {
    const control = this.registerForm.get(fieldName);

    if (fieldName === 'question') {
      this.selectedQuestion = !!control?.value; // true si se selecciona una pregunta, false de lo contrario
    }

    // Resto de tu lógica de manejo de errores aquí
  }



  // Validación personalizada de contraseña
  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
    const isLengthValid = password.length >= 8;

    if (isLengthValid && hasUpperCase && hasLowerCase && hasNumber && hasSymbol) {
      return null; // La contraseña es válida
    } else {
      return { invalidPassword: true }; // La contraseña no cumple con los criterios
    }
  }


  ngOnInit(): void {
    const divSelect = document.querySelector('.avatar') as HTMLSelectElement;
    const maxIndex = 4; // Define el índice máximo que quieres comprobar

    // Un bucle que recorre desde 1 hasta el índice máximo
    for (let i = 1; i <= maxIndex; i++) {
      const divAvatarIcon = document.querySelector(`#Avatar_Icon${i}`) as HTMLElement;

      divSelect.addEventListener('change', () => {
        if (divSelect.selectedIndex === i - 1) { // Resta 1 para que coincida con el índice base 0
          // Se seleccionó la opción correspondiente al índice i
          if (divAvatarIcon) {
            divAvatarIcon.style.opacity = '1'; // Mostrar el div
          }
        } else {
          // Opción distinta del índice i
          if (divAvatarIcon) {
            divAvatarIcon.style.opacity = '0'; // Ocultar el div
          }
        }
      });
    }



  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      const registerData = {
        username: formData.username,
        name: formData.name,
        last_name: formData.last_name,
        email: formData.email,
        img: formData.img,
        password: formData.password,
        question: formData.question,
        answer: formData.answer
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      //http://127.0.0.1:8002/api/create/ || http://20.25.34.123:8002/api/create/
      this.http.post('https://store.thenexusbattles2.cloud/login-api/api/create/', registerData, { headers }).subscribe(
        (response: any) => {
          console.log('Registro exitoso:', response);
        },
        (error) => {
          console.error('Error al registrar:', error);
        }
      );
    }
  }
}
