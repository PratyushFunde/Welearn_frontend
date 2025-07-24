import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewGuide } from './interview-guide';

describe('InterviewGuide', () => {
  let component: InterviewGuide;
  let fixture: ComponentFixture<InterviewGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewGuide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewGuide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
