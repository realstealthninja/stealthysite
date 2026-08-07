import { TestBed } from '@angular/core/testing';

import { UserauthService } from './userauth.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('RegistrationService', () => {
  let httpTesting: HttpTestingController;
  let service: UserauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
