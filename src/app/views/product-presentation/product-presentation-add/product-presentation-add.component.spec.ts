import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPresentationAddComponent } from './product-presentation-add.component';

describe('ProductPresentationAddComponent', () => {
  let component: ProductPresentationAddComponent;
  let fixture: ComponentFixture<ProductPresentationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPresentationAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPresentationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
