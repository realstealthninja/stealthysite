import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, FormRoot } from '@angular/forms/signals';
import { TagFieldComponent } from '../../../components/tag-field/tag-field.component';
import { BloggingService } from '../../../services/blogging/blogging.service';
import { BlogModel } from '../../../interfaces/blog';
import { FileFieldComponent } from '../../../components/file-field/file-field.component';
import { Router } from '@angular/router';

@Component({
  imports: [FormField, TagFieldComponent, FormRoot, FileFieldComponent],
  selector: 'app-blog-upload',
  styleUrl: './blog-upload.component.css',
  templateUrl: './blog-upload.component.html',
})
export class BlogUploadComponent {
  bloggingService = inject(BloggingService);
  router = inject(Router);

  blogModel = signal<BlogModel>({
    title: '',
    tags: [],
    content: new File([], '', {}),
  });

  blogForm = form(
    this.blogModel,
    (schemaPath) => {
      required(schemaPath.title, { message: 'A title is required' });
      required(schemaPath.tags, { message: 'At least one tag is required' });
      required(schemaPath.content, { message: 'A markdown file is required' });
    },
    {
      submission: {
        action: async (field) => {
          this.bloggingService.postBlog(field().value());
        },
      },
    },
  );
}
