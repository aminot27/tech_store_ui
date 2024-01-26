import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOutputAddComponent } from './product-output-add.component';

describe('ProductOutputAddComponent', () => {
  let component: ProductOutputAddComponent;
  let fixture: ComponentFixture<ProductOutputAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOutputAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOutputAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
