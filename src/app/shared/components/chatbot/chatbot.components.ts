import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

interface Message{
    text: string;
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

    constructor(private localStorage: LocalStorageService){
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
            text: this.messageText
        }
        this.messages.push(newMessage);
        this.messageText = '';

        const time = new Date().getTime();
        this.localStorage.store(this.messagesKey,{
            messages: this.messages,
            timestamp: time
        })
    }
}