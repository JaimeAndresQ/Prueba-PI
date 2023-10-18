import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

interface Message{
    text: string;
    type: string
}


@Component({
    selector: 'chatbot',
    templateUrl: './chatbot.components.html',
    styleUrls: ['./chatbot.components.css']
})

export class ChatbotComponent{

    messageText: string = '';
    messages: Message[] = [];
    messagesKey: string = 'chatbotMessages';

    constructor(private localStorage: LocalStorageService, private http: HttpClient){
        const saved = this.localStorage.retrieve(this.messagesKey);

        if(saved && saved.timestamp){
            const time = new Date().getTime();
            const diff = time - saved.timestamp;
            if(diff <= 10*60*1000){
                this.messages = saved.messages;
            }else{
                this.localStorage.clear(this.messagesKey)
            }
        }
    }

    sendMessage() {
        if (this.messageText.trim() === '') {
          return; // Evitar mensajes en blanco
        }
    
        const newMessage: Message ={
            text: this.messageText,
            type: 'user'
        }
        this.messages.push(newMessage);
        this.messageText = '';
        //const chatEndpoint = 'http://127.0.0.1:8000/api/question/'
        const chatEndpoint = 'https://api.thenexusbattles2.cloud/chatbot/api/question/'
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const requestData = { question: newMessage.text}
        this.http.post(chatEndpoint,requestData, {headers}).subscribe(
            (response: any)=>{
                const answer: Message = {
                    text: response.Respuesta,
                    type: 'bot'
                };
                console.log(response.Respuesta)
                this.messages.push(answer);
                this.localStorage.store(this.messagesKey,{
                    messages: this.messages,
                    timestamp: new Date().getTime()
                })
            }
        )
        const time = new Date().getTime();
        this.localStorage.store(this.messagesKey,{
            messages: this.messages,
            timestamp: time
        })
    }
}