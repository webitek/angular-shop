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

  constructor(private service: ProductsService, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  public refresh() {
    this.getProducts();
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

  public addCart(){
      // this.router.navigate(["cart"]);
  }

  private getProducts(){
    this.service.getProducts().subscribe(
        products => this.products = products,
        error => this.errorMessage = error
    )
  }

}
