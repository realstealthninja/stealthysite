import { TestBed } from '@angular/core/testing';

import { HttpResourceRef, provideHttpClient } from '@angular/common/http';

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { ApplicationRef } from '@angular/core';
import { VersionResp } from '../../interfaces/version';
import { VersionService } from './version.service';

describe('VersionService', () => {
  let service: VersionService;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(VersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get java version', async () => {
    const body = { name: 'java', version: '21.0.11+10-LTS' };
    let javaVersion!: HttpResourceRef<VersionResp | undefined>;

    TestBed.runInInjectionContext(() => {
      javaVersion = service.getJavaVersion();
    });
    TestBed.tick(); // ensure that the request is sent

    const req = httpTesting.expectOne('/api/v1/version/java');
    expect(req.request.method).toBe('GET');
    req.flush(body);

    await TestBed.inject(ApplicationRef).whenStable(); // complete the async operation before checking

    expect(javaVersion.hasValue()).toEqual(true);
    expect(javaVersion.value()).toEqual(body);
  });

  it('should get spring version', async () => {
    const body = { name: 'spring', version: '7.0.8' };
    let springVersion!: HttpResourceRef<VersionResp | undefined>;

    TestBed.runInInjectionContext(() => {
      springVersion = service.getSpringVersion();
    });

    TestBed.tick();

    const req = httpTesting.expectOne('/api/v1/version/spring');
    expect(req.request.method).toBe('GET');
    req.flush(body);

    await TestBed.inject(ApplicationRef).whenStable();

    expect(springVersion.hasValue()).toEqual(true);
    expect(springVersion.value()).toEqual(body);
  });
});
