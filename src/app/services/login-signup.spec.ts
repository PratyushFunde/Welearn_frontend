import { TestBed } from '@angular/core/testing';

import { LoginSignup } from './login-signup';

describe('LoginSignup', () => {
  let service: LoginSignup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSignup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
