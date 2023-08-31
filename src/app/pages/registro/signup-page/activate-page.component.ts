
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class ActivateComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {}

  onSubmit() {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post('http://login.thenexusbattles2.com:8001/api/activate/', registerData, { headers }).subscribe(
        (response: any) => {
          console.log('Registro exitoso:', response);
        },
        (error) => {
          console.error('Error al registrar:', error);
        }
      );
    }
}
