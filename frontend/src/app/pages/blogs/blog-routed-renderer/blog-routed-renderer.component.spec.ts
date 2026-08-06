import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogRoutedRendererComponent } from './blog-routed-renderer.component';

describe('BlogRoutedRendererComponent', () => {
  let component: BlogRoutedRendererComponent;
  let fixture: ComponentFixture<BlogRoutedRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogRoutedRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogRoutedRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
