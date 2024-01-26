import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOutputDeleteComponent } from './product-output-delete.component';

describe('ProductOutputDeleteComponent', () => {
  let component: ProductOutputDeleteComponent;
  let fixture: ComponentFixture<ProductOutputDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOutputDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOutputDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
