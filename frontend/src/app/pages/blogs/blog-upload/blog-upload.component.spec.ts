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

  it('should post when submit button is pressed', async () => {
    const submitbtn = (fixture.nativeElement as HTMLElement).querySelector(
      'button',
    ) as HTMLButtonElement;

    expect(submitbtn).toBeTruthy();
    expect(submitbtn.disabled).toBeTrue(); // must be disabled when contents are empty

    spyOn(component.bloggingService, 'postBlog');

    component.blogForm.title().value.set('my blog');
    component.blogForm.tags().value.set(['tag1', 'tag2', 'tag3']);
    component.blogForm
      .content()
      .value.set(new File([], 'myfile.md', { type: 'text/markdown' }));

    component.blogForm().markAsDirty(); // we modified the form programmatically
    fixture.detectChanges();
    expect(submitbtn.disabled).toBeFalse();
    submitbtn.click();
    await fixture.whenStable();
    expect(component.bloggingService.postBlog).toHaveBeenCalled();
  });
});
