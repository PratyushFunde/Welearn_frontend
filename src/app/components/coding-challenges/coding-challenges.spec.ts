import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingChallenges } from './coding-challenges';

describe('CodingChallenges', () => {
  let component: CodingChallenges;
  let fixture: ComponentFixture<CodingChallenges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodingChallenges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodingChallenges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
