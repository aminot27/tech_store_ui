import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPresentationDeleteComponent } from './product-presentation-delete.component';

describe('ProductPresentationDeleteComponent', () => {
  let component: ProductPresentationDeleteComponent;
  let fixture: ComponentFixture<ProductPresentationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPresentationDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPresentationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
