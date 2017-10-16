import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../products/product';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-products-delete',
  templateUrl: './products-delete.component.html',
  styleUrls: ['./products-delete.component.css']
})
export class ProductsDeleteComponent implements OnInit {

  currentProduct: Product;
  errorMessage: string;

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private servise: ProductsService) { }

  ngOnInit() {
    let id = this.activatedRouter.snapshot.params["id"];
    if(id) {
      this.servise.getProduct(id)
          .subscribe(
              product => this.currentProduct = product,
              error => this.errorMessage = error
          )
    }
  }
  deleteProduct() {
    this.servise.deleteProduct(this.currentProduct)
        .subscribe(
            () => this.goBack(),
            error => this.errorMessage = error
        )
  }

  goBack() {
    this.router.navigate(["/products"]);
  }

}
