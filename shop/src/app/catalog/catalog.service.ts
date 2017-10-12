import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CatalogService {

  constructor(private jsonp: Jsonp) { }

  public getProducts (term){
      let productsLink = "http://localhost:2403/products";
      let params = new URLSearchParams();
      params.set('search', term);
      params.set('action', 'opensearch');
      params.set('format', 'json');
      params.set('callback', 'JSONP_CALLBACK');

      return this.jsonp.get(productsLink, {search: params})
          .map(response => {
              let responseData = <string[]>response.json();
              console.log(responseData);
              /*let type = responseData[1];
              let name = responseData[2];
              let price = responseData[3];
              let colors = responseData[4];
              let length = name.length;
              let result: any[] = [];
              for (let i = 0; i < length; i++){
                  result.push({
                      name: name[i],
                      link: links[i],
                      description: descriptions[i]
                  });
              }*/
              // return result;
          });
  }

}
