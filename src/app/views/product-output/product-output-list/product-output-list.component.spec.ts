import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOutputListComponent } from './product-output-list.component';

describe('ProductOutputListComponent', () => {
  let component: ProductOutputListComponent;
  let fixture: ComponentFixture<ProductOutputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOutputListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOutputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
