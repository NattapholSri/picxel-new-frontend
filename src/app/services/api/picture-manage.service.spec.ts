import { TestBed } from '@angular/core/testing';

import { PictureManageService } from './picture-manage.service';

describe('PictureManageService', () => {
  let service: PictureManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
