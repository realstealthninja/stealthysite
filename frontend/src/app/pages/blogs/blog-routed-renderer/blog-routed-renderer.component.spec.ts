import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogRoutedRendererComponent } from './blog-routed-renderer.component';
import { provideRouter } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';

describe('BlogRoutedRendererComponent', () => {
  let component: BlogRoutedRendererComponent;
  let fixture: ComponentFixture<BlogRoutedRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogRoutedRendererComponent],
      providers: [
        provideRouter([
          { path: 'blogs/1', component: BlogRoutedRendererComponent },
        ]),
        provideMarkdown(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogRoutedRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
