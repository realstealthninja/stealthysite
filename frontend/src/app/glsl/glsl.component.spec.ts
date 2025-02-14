import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlslComponent } from './glsl.component';

describe('GlslComponent', () => {
  let component: GlslComponent;
  let fixture: ComponentFixture<GlslComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlslComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
