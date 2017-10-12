import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CatalogService } from './catalog/catalog.service'

import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CatalogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
