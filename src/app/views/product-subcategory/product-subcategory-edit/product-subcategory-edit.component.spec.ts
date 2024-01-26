import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubcategoryEditComponent } from './product-subcategory-edit.component';

describe('ProductSubcategoryEditComponent', () => {
  let component: ProductSubcategoryEditComponent;
  let fixture: ComponentFixture<ProductSubcategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSubcategoryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSubcategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
