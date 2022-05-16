import { TestBed } from '@angular/core/testing';

import { PaymentExistGuard } from './payment-exist.guard';

describe('PaymentExistGuard', () => {
  let guard: PaymentExistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaymentExistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
