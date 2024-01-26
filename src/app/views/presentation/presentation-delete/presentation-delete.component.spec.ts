import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationDeleteComponent } from './presentation-delete.component';

describe('PresentationDeleteComponent', () => {
  let component: PresentationDeleteComponent;
  let fixture: ComponentFixture<PresentationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
