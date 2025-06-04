import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlslComponent } from './glsl.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('GlslComponent', () => {
  let component: GlslComponent;
  let fixture: ComponentFixture<GlslComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlslComponent],

      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(GlslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
