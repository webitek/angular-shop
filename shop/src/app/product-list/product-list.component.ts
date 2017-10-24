import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../products/product';
import { CartProduct } from "../cart/cart-products";
import {count} from "rxjs/operator/count";
import {error} from "util";
import {AuthService} from "../services/auth.service";

declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  errorMessage: string;
  counter: object = {};
  order: CartProduct[] = [];


  constructor(private productService: ProductsService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getProducts();
  }

  public refresh() {
    this.getProducts();
  }
  public toCart(){
    this.router.navigate(["cart",]);
  }

  public editProduct(product: Product) {
    this.router.navigate(["products", "edit", product.id]);
  }

  public deleteProduct(product: Product){
    this.router.navigate(["products", "delete", product.id]);
  }

  public createProduct(){
    this.router.navigate(["products", "create"]);
  }
  public addCart(product: Product){

    this.counter[product.id]
        ?this.counter[product.id]++
        :this.counter[product.id] = 1;


    if (this.order.find(item => item.id == product.id)) {

      let newOrder = {
        'id': product.id,
        'name': product.name,
        'price': product.price,
        'count': this.counter[product.id]? this.counter[product.id]: 0
      };

      this.order[this.order.findIndex(item => item.id == product.id)].count++;

      this.productService.updateCartProduct(newOrder).subscribe(
          () => console.log('update'),
          error => this.errorMessage = error
      );
    } else {
      let newOrder = {
          'id': product.id,
          'name': product.name,
          'price': product.price,
          'count': this.counter[product.id]? this.counter[product.id]: 0
      };
      this.order.push(newOrder);
      this.productService.addCartProduct(newOrder).subscribe(
          () => console.log('add'),
          error => this.errorMessage = error
      );
    }
    console.log(this.order);
  }

  private getProducts(){
    this.productService.getProducts().subscribe(
        products => this.products = products,
        error => this.errorMessage = error
    )
  }

  toAdmin(){
    this.router.navigate(["/admin"]);
  }
}
