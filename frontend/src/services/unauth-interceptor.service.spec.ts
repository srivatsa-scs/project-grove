import { TestBed } from '@angular/core/testing';

import { UnauthInterceptorService } from './unauth-interceptor.service';

describe('UnauthInterceptorService', () => {
  let service: UnauthInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnauthInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
