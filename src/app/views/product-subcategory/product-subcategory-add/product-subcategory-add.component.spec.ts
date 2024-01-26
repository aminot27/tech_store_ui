import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubcategoryAddComponent } from './product-subcategory-add.component';

describe('ProductSubcategoryAddComponent', () => {
  let component: ProductSubcategoryAddComponent;
  let fixture: ComponentFixture<ProductSubcategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSubcategoryAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSubcategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
