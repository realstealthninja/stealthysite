import { TestBed } from '@angular/core/testing';

import { BloggingService } from './blogging.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('BloggingService', () => {
  let httpTesting: HttpTestingController;
  let service: BloggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClientTesting()] });
    httpTesting = TestBed.inject(HttpTestingController);
    TestBed.runInInjectionContext(() => {
      service = TestBed.inject(BloggingService);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
