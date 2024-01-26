import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationDetailAddComponent } from './specification-detail-add.component';

describe('SpecificationDetailAddComponent', () => {
  let component: SpecificationDetailAddComponent;
  let fixture: ComponentFixture<SpecificationDetailAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationDetailAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificationDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
