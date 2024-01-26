import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationDetailDeleteComponent } from './specification-detail-delete.component';

describe('SpecificationDetailDeleteComponent', () => {
  let component: SpecificationDetailDeleteComponent;
  let fixture: ComponentFixture<SpecificationDetailDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationDetailDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificationDetailDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
