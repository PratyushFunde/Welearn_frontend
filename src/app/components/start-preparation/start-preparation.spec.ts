import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPreparation } from './start-preparation';

describe('StartPreparation', () => {
  let component: StartPreparation;
  let fixture: ComponentFixture<StartPreparation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartPreparation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartPreparation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
