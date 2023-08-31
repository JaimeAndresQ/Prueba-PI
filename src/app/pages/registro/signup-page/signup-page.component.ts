import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      password: ['', Validators.required],
      question: [null, Validators.required],
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
        password: formData.password,
        question: formData.question,
        answer: formData.answer
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post('http://login.thenexusbattles2.com:8001/api/create/', registerData, { headers }).subscribe(
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
