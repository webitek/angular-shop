import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { CartProduct } from "./cart-products";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CartService {
  private url = "http://localhost:2403/cart-products";

  constructor(private http: Http) { }

  public getProducts(): Observable<CartProduct[]> {
    return this.http
        .get(this.url)
        .map(response => response.json() as CartProduct[])
        .catch(this.handleError);
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
