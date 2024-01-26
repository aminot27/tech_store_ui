import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDeleteComponent } from './unit-delete.component';

describe('UnitDeleteComponent', () => {
  let component: UnitDeleteComponent;
  let fixture: ComponentFixture<UnitDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
