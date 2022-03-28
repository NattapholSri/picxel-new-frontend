import { TestBed } from '@angular/core/testing';

import { SubscriptPlanService } from './subscript-plan.service';

describe('SubscriptPlanService', () => {
  let service: SubscriptPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
