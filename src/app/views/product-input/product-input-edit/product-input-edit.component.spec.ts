import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInputEditComponent } from './product-input-edit.component';

describe('ProductInputEditComponent', () => {
  let component: ProductInputEditComponent;
  let fixture: ComponentFixture<ProductInputEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInputEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInputEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
