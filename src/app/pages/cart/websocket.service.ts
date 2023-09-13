import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class WebsocketService {
    private socket;

    constructor() {
        this.socket = io('https://store.thenexusbattles2.com/websocket')
        //this.socket = io('http://localhost:3000');
        console.log('WebSocket connected');
    }

    //escuchar eventos de websocket
    listen(eventName: string): Observable<any> {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data: any) => {
                subscriber.next(data);
            });
        });
    }

    //emitir los eventos
    emit(eventName: string, data: any): void {
        this.socket.emit(eventName, data);
    }
}
