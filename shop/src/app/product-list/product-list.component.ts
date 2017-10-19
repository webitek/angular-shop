import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../products/product';


@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  errorMessage: string;
  counter: number =1;

  constructor(private productService: ProductsService, private router: Router) { }

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
    console.log(product);
    this.counter++;

    // this.router.navigate(["cart", product]);
    // this.router.navigate(["cart", {action: product}]);
  }

  private getProducts(){
    this.productService.getProducts().subscribe(
        products => this.products = products,
        error => this.errorMessage = error
    )
  }
}
