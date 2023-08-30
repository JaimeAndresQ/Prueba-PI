import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NoopAnimationsModule,
    MatIconModule,
    HttpClientModule,
    ProductsModule
  ],
  exports: [MatIconModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
