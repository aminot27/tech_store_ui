import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationListComponent } from './presentation-list.component';

describe('PresentationListComponent', () => {
  let component: PresentationListComponent;
  let fixture: ComponentFixture<PresentationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
