import { TestBed } from '@angular/core/testing';
import { AuthorPipe } from './author.pipe';

describe('AuthorPipe', () => {
  it('create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const pipe = new AuthorPipe();
      expect(pipe).toBeTruthy();
    });
  });
});
