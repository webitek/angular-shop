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

  public productsPerPage = 4;
  public selectedPage = 1;


  constructor(private productService: ProductsService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
        products => this.products = products,
        error => this.errorMessage = error
    );
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
  }

  private getProducts(){
    if(this.products){
        let pageIndex = (this.selectedPage - 1)  * this.productsPerPage;
        return this.products.slice(pageIndex, pageIndex + this.productsPerPage)
    }
    /*this.productService.getProducts().subscribe(
        products => this.products = products,
        error => this.errorMessage = error
    )*/
  }

  toAdmin(){
    this.router.navigate(["/admin"]);
  }

  changePage (newPage: number){
      this.selectedPage = newPage;
  }

  changePageSize(newSize: number){
      this.productsPerPage = Number(newSize);
      this.changePage(1);
  }

  getPageNumbers(): number[] {
      if(this.products){
          return Array(Math.ceil(this.products.length / this.productsPerPage))
              .fill(0)
              .map((x,i) => i + 1);
      }

  }
}
