import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCreateEditComponent } from './products-create-edit.component';

describe('ProductsCreateEditComponent', () => {
  let component: ProductsCreateEditComponent;
  let fixture: ComponentFixture<ProductsCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
