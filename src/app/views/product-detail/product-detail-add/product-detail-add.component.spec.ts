import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailAddComponent } from './product-detail-add.component';

describe('ProductDetailAddComponent', () => {
  let component: ProductDetailAddComponent;
  let fixture: ComponentFixture<ProductDetailAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
