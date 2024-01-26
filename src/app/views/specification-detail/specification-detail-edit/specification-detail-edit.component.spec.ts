import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationDetailEditComponent } from './specification-detail-edit.component';

describe('SpecificationDetailEditComponent', () => {
  let component: SpecificationDetailEditComponent;
  let fixture: ComponentFixture<SpecificationDetailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationDetailEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificationDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
