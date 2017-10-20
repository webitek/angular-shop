import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Product } from '../products/product';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {CartProduct} from "../cart/cart-products";

@Injectable()
export class ProductsService {
  private url = "http://localhost:2403/products";
  private urlCart = "http://localhost:2403/cart-products";
  private counter: number = 1;

  constructor(private http: Http) { }

  public getProducts(): Observable<Product[]>{
    let products = this.http.get(this.url)
        .map(this.extractProducts)
        .catch(this.handleError);
    return products;
  }

  public getProduct(id: string): Observable<Product>{
    let product = this.http.get(this.url + "/" + id)
        .map(this.extractProduct)
        .catch(this.handleError);
    return product;
  }

  public addProduct(product: Product) {
    return this.http.post(this.url, product)
        .catch(this.handleError);
  }

  public addCartProduct(product: CartProduct) {
      return this.http.post(this.urlCart, {name: product.name, price: product.price, count: product.count})
          .catch(this.handleError);
  }

  public updateCartProduct(product: CartProduct) {
    return this.http.put(this.urlCart + "/" + product.id, product)
        .catch(this.handleError);
  }

  public updateProduct(product: Product) {
    return this.http.put(this.url + "/" + product.id, product)
        .catch(this.handleError);
  }

  public deleteProduct(product: Product) {
    return this.http.delete(this.url + "/" + product.id)
        .catch(this.handleError);
  }


  private extractProducts(response: Response){
    let res = response.json();
    let products: Product[] = [];
    for(let i = 0; i < res.length; i ++) {
      products.push(new Product(res[i].id, res[i].name, res[i].price))
    }
    return products;
  }

  private extractProduct(response: Response) {
    let res = response.json();
    let product = new Product(res.id, res.name, res.price);
    return product;
  }

  private handleError(error: any, cought: Observable<any>): any {
    let message = '';

    if(error instanceof Response){
      let errorData = error.json().error || JSON.stringify(error.json());
      message = `${error.status} - ${error.statusText || ''} ${errorData}`
    } else{
      message = error.message ? error.message : error.toString();
    }
    return Observable.throw(message);
  }

}
