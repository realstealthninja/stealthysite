import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogRendererComponent } from './blog-renderer.component';

describe('BlogRendererComponent', () => {
  let component: BlogRendererComponent;
  let fixture: ComponentFixture<BlogRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
