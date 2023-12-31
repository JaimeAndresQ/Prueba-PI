import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from './components/chatbot/chatbot.components';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ModalEjemploComponent } from './components/modal-ejemplo/modal-ejemplo.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [MatIconModule, CommonModule, FormsModule, NgxWebstorageModule.forRoot() ],
  exports: [NavbarComponent, ChatbotComponent, ModalEjemploComponent, FooterComponent],
  declarations: [
    NavbarComponent,
    ChatbotComponent,
    ModalComponent,
    ModalEjemploComponent,
    FooterComponent
  ],
})
export class SharedModule { }
