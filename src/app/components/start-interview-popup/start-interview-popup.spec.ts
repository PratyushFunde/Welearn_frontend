import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartInterviewPopup } from './start-interview-popup';

describe('StartInterviewPopup', () => {
  let component: StartInterviewPopup;
  let fixture: ComponentFixture<StartInterviewPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartInterviewPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartInterviewPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
