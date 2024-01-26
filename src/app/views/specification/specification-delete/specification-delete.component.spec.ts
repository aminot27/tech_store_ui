import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationDeleteComponent } from './specification-delete.component';

describe('SpecificationDeleteComponent', () => {
  let component: SpecificationDeleteComponent;
  let fixture: ComponentFixture<SpecificationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
