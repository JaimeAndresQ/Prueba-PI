import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from './components/chatbot/chatbot.components';
import { NgxWebstorageModule } from 'ngx-webstorage';

@NgModule({
  imports: [MatIconModule, CommonModule, FormsModule, NgxWebstorageModule.forRoot() ],
  exports: [NavbarComponent, ChatbotComponent],
  declarations: [
    NavbarComponent,
    ChatbotComponent,
    ModalComponent
  ],
})
export class SharedModule { }
