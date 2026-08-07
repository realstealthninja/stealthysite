import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMarkdownRendererComponent } from './blog-markdown-renderer.component';
import { provideMarkdown } from 'ngx-markdown';

describe('BlogMarkdownRendererComponent', () => {
  let component: BlogMarkdownRendererComponent;
  let fixture: ComponentFixture<BlogMarkdownRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogMarkdownRendererComponent],
      providers: [provideMarkdown()],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogMarkdownRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
