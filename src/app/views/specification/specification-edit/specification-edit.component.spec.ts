import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationEditComponent } from './specification-edit.component';

describe('SpecificationEditComponent', () => {
  let component: SpecificationEditComponent;
  let fixture: ComponentFixture<SpecificationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
