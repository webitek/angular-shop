import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from "../cart.service";
import { CartProduct } from "../cart-products";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  currentProduct: CartProduct;
  products: CartProduct[];
  errorMessage: string;

  constructor(private service: CartService,
              private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  public goBack(){
    this.router.navigate(["/products"]);
  }

  private getProducts(){
    this.service.getProducts().subscribe(
        // function(response) { console.log("Success Response" + response)},
        // function(error) { console.log("Error happened" + error)},
        // function() { console.log("the subscription is completed")},
        products => {
          products.forEach((item)=>{
            // item.id = 0;
            console.log(item);
          })
          return this.products = products
        },
        error => this.errorMessage = error
    )
  }

}
