import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogUploadComponent } from './blog-upload.component';

describe('BlogUploadComponent', () => {
  let component: BlogUploadComponent;
  let fixture: ComponentFixture<BlogUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
