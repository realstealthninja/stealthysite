import { TestBed } from '@angular/core/testing';

import { UserauthService } from './userauth.service';

describe('RegistrationService', () => {
  let service: UserauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
