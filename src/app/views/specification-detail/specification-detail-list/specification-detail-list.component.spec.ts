import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationDetailListComponent } from './specification-detail-list.component';

describe('SpecificationDetailListComponent', () => {
  let component: SpecificationDetailListComponent;
  let fixture: ComponentFixture<SpecificationDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationDetailListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificationDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
