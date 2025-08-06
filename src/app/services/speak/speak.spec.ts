import { TestBed } from '@angular/core/testing';

import { Speak } from './speak';

describe('Speak', () => {
  let service: Speak;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Speak);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
