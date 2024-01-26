import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInputAddComponent } from './product-input-add.component';

describe('ProductInputAddComponent', () => {
  let component: ProductInputAddComponent;
  let fixture: ComponentFixture<ProductInputAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInputAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInputAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
