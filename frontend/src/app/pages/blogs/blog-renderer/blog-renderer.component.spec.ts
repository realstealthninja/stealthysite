import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogRendererComponent } from './blog-renderer.component';
import { provideMarkdown } from 'ngx-markdown';

describe('BlogRendererComponent', () => {
  let component: BlogRendererComponent;
  let fixture: ComponentFixture<BlogRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogRendererComponent],
      providers: [provideMarkdown()],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogRendererComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('blogId', 'ffff-ffff-ffff-ffff');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
