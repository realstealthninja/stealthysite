import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { profileResolver } from './profile.resolver';
import { User } from '../interfaces/user';

describe('profileResolver', () => {
  const executeResolver: ResolveFn<User> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => profileResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
