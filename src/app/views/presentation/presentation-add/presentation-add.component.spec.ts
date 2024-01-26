import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationAddComponent } from './presentation-add.component';

describe('PresentationAddComponent', () => {
  let component: PresentationAddComponent;
  let fixture: ComponentFixture<PresentationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
