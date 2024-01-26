import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPresentationEditComponent } from './product-presentation-edit.component';

describe('ProductPresentationEditComponent', () => {
  let component: ProductPresentationEditComponent;
  let fixture: ComponentFixture<ProductPresentationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPresentationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPresentationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
