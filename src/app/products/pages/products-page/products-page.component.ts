import { Component } from '@angular/core';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {
  public products = [
    {
      name: "Product 1",
      description: "This is a product description.",
    },
    {
      name: "Product 2",
      description: "This is another product description.",
    },
    {
      name: "Product 3",
      description: "This is the third product description.",
    },
  ];

}
