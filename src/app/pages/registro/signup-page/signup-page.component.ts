import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importa jQuery y Select2
declare var $: any;

@Component({
  selector: 'signup-component',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  registerForm: FormGroup;
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
      email: ['', Validators.required],
      img: ['', Validators.required,],
      password: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  ngOnInit(): void {}


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
      this.http.post('http://127.0.0.1:8002/api/create/', registerData, { headers }).subscribe(
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
