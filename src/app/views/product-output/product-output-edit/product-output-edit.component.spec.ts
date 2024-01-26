import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOutputEditComponent } from './product-output-edit.component';

describe('ProductOutputEditComponent', () => {
  let component: ProductOutputEditComponent;
  let fixture: ComponentFixture<ProductOutputEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOutputEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOutputEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
