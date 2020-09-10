import { TestBed } from '@angular/core/testing';

import { InfoGetterService } from '../services/info-getter.service';

describe('InfoGetterService', () => {
  let service: InfoGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
