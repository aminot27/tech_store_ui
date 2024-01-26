import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPresentationListComponent } from './product-presentation-list.component';

describe('ProductPresentationListComponent', () => {
  let component: ProductPresentationListComponent;
  let fixture: ComponentFixture<ProductPresentationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPresentationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPresentationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
