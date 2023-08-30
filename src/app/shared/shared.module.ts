import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [MatIconModule, CommonModule ],
  exports: [NavbarComponent],
  declarations: [
    NavbarComponent
  ],
})
export class SharedModule { }
