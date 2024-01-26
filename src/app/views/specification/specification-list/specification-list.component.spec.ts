import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationListComponent } from './specification-list.component';

describe('SpecificationListComponent', () => {
  let component: SpecificationListComponent;
  let fixture: ComponentFixture<SpecificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
