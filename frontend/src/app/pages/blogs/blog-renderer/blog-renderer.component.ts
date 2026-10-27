import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { UserauthService } from '../../../services/userauth/userauth.service';
import { Parser } from 'marked';
import { AuthorPipe } from '../../../pipes/author.pipe';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { BloggingService } from '../../../services/blogging/blogging.service';
import { Blog } from '../../../classes/blog/blog';
import { TagFieldComponent } from '../../../components/tag-field/tag-field.component';
import { form, FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'app-blog-renderer',
  imports: [
    MarkdownComponent,
    AuthorPipe,
    AsyncPipe,
    TitleCasePipe,
    RouterLink,
    DatePipe,
    TagFieldComponent,
    FormField,
    FormRoot,
  ],
  templateUrl: './blog-renderer.component.html',
  styleUrl: './blog-renderer.component.css',
})
export class BlogRendererComponent implements OnInit {
  userAuthService = inject(UserauthService);
  bloggingService = inject(BloggingService);
  markdownService = inject(MarkdownService);
  router = inject(Router);
  blogId = input.required<string>();
  is_editting = false;

  blog$!: Observable<Blog>;

  blogModel = signal<{ title: string; tags: string[]; content: string }>({
    title: '',
    content: '',
    tags: [],
  });

  blogForm = form(this.blogModel, {
    submission: {
      action: async (field) => {
        this.bloggingService
          .putBlog(this.blogId(), field().value())
          ?.subscribe({
            next: () => {
              window.location.reload();
            },
            error: (err) => {
              alert(err);
            },
          });
      },
    },
  });

  constructor() {
    effect(() => {
      this.blog$ = this.bloggingService.getBlog(this.blogId());
      this.blog$.subscribe({
        next: (blog) => {
          this.blogForm.title().value.set(blog.title);
          this.blogForm.content().value.set(blog.content);
          this.blogForm.tags().value.set(blog.tags);
        },
      });
    });
  }

  calculateReadTime(content: string): number {
    return Math.ceil(content.split(' ').length / 260);
  }

  almostSame(lhs: Date, rhs: Date): boolean {
    lhs.setMilliseconds(0);
    rhs.setMilliseconds(0);
    lhs.setSeconds(0);
    rhs.setSeconds(0);

    return lhs.getTime() === rhs.getTime();
  }

  ordinal(date: number): string {
    const ordinals = ['th', 'st', 'nd', 'rd', 'th'];
    const last_digit = date % 10;

    return (
      date.toString() +
      (last_digit < 5 ? ordinals[last_digit % 5] : ordinals[0])
    );
  }

  deleteBlog() {
    if (
      confirm(
        'Are you sure you want to delete this blog? This action cannot be undone, please save a copy locally',
      )
    ) {
      this.bloggingService.deleteBlog(this.blogId());
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.markdownService.renderer.heading = ({ tokens, depth }) => {
      const text = Parser.parseInline(tokens);
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

      // There should be only one h1 heading in page, and user's blog title should be used instead of #
      if (depth == 1) {
        return ``;
      }

      return `
            <h${depth}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${depth}>`;
    };
  }
}
