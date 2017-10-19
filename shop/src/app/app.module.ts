import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule, JsonpModule } from "@angular/http";

import { ProductsService } from "./services/products.service";
import { CartService } from "./cart/cart.service";

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './product-list/product-list.component';
import { ProductsDeleteComponent } from './products-delete/products-delete.component';
import { ProductsCreateEditComponent } from './products-create-edit/products-create-edit.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductsDeleteComponent,
    ProductsCreateEditComponent,
    CartListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
          { path: 'products', component: ProductsListComponent},
          { path: 'products/delete/:id', component: ProductsDeleteComponent },
          { path: 'products/edit/:id', component: ProductsCreateEditComponent },
          { path: 'products/create', component: ProductsCreateEditComponent },
          { path: 'cart', component: CartListComponent },
          { path: '', component: ProductsListComponent}
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [ProductsService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
