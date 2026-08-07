import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogHomeComponent } from './blog-home.component';
import { provideRouter } from '@angular/router';

describe('BlogHomeComponent', () => {
  let component: BlogHomeComponent;
  let fixture: ComponentFixture<BlogHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogHomeComponent],
      providers: [
        provideRouter([{ path: 'blogs', component: BlogHomeComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
