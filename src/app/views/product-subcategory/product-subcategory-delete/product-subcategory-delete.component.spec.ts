import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubcategoryDeleteComponent } from './product-subcategory-delete.component';

describe('ProductSubcategoryDeleteComponent', () => {
  let component: ProductSubcategoryDeleteComponent;
  let fixture: ComponentFixture<ProductSubcategoryDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSubcategoryDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSubcategoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
