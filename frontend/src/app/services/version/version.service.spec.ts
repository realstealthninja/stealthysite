import { TestBed } from '@angular/core/testing';

import { VersionService } from './version.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('VersionService', () => {
  let service: VersionService;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(VersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get java version', async () => {
    const body = { name: 'java', version: '21.0.11+10-LTS' };

    const javaVersion = service.getJavaVersion();
    TestBed.tick();
    const req = httpTesting.expectOne('/api/v1/version/java');

    expect(req.request.method).toBe('GET');

    req.flush(body);
    expect(javaVersion.hasValue()).toEqual(true);
    expect(javaVersion.value()).toEqual(body);
  });

  it('should get spring version', () => {
    const body = { name: 'spring', version: '7.0.8' };
    const springVersion = service.getSpringVersion();
    TestBed.tick();

    const req = httpTesting.expectOne('/api/v1/version/spring');

    req.flush(body);
    expect(springVersion.hasValue()).toBe(true);
    expect(springVersion.value()).toBe(body);
  });
});
