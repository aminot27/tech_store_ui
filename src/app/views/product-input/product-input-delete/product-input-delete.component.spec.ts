import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInputDeleteComponent } from './product-input-delete.component';

describe('ProductInputDeleteComponent', () => {
  let component: ProductInputDeleteComponent;
  let fixture: ComponentFixture<ProductInputDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInputDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInputDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
