import { TestBed } from '@angular/core/testing';

import { DisableIfLoginGuard } from './disable-if-login.guard';

describe('DisableIfLoginGuard', () => {
  let guard: DisableIfLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DisableIfLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
