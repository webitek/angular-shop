import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {ProductsService} from "../services/products.service";
import { Product } from "../products/product";


@Component({
  selector: 'products-create-edit',
  templateUrl: './products-create-edit.component.html',
  styleUrls: ['./products-create-edit.component.css']
})
export class ProductsCreateEditComponent implements OnInit {

  currentProduct: Product;
  errorMessage: string;
  productForm: FormGroup;

  constructor(private service: ProductsService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }


  ngOnInit() {
    this.buildForm();
    this.getProductFromRoute();
  }

  public checkError(element: string, errorType: string){
    return this.productForm.get(element).hasError(errorType) &&
        this.productForm.get(element).touched
  }

  public onSubmit(productForm: FormGroup) {
    this.currentProduct.name = productForm.value.name;
    this.currentProduct.price = productForm.value.price;

    if(this.currentProduct.id){
      this.service.updateProduct(this.currentProduct)
          .subscribe(
              () => this.goBack(),
              error => this.errorMessage = error
          );
    } else {
      this.service.addProduct(this.currentProduct)
          .subscribe(
              () => this.goBack(),
              error => this.errorMessage = error
          );
    }
  }

  public goBack(){
    this.router.navigate(["/products"]);
  }

  private getProductFromRoute(){
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];

      if(id) {
        this.service.getProduct(id).subscribe(
            product => {
              this.currentProduct = product;
              this.productForm.patchValue(this.currentProduct);
            },
            error => this.errorMessage = error
        )
      } else {
        this.currentProduct = new Product(null, null, null);
        this.productForm.patchValue(this.currentProduct);
      }
    });
  }

  private buildForm(){
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      price: ["", Validators.required]
    })
  }
}
