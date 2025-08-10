import { Component, inject, signal } from '@angular/core';
import { MarkdownPipe } from 'ngx-markdown';
import { BloggingService } from '../../services/blogging/blogging.service';
import { Observable } from 'rxjs/internal/Observable';
import { Blog } from '../../interfaces/blog';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blog-renderer',
  imports: [MarkdownPipe, AsyncPipe],
  templateUrl: './blog-renderer.component.html',
  styleUrl: './blog-renderer.component.css'
})
export class BlogRendererComponent {
  private bloggingService: BloggingService = inject(BloggingService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  blogid = signal<number | null>(null);
  blog$: Observable<Blog> | undefined;


  constructor() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.blogid.set(params['id'])
        this.blog$ = this.bloggingService.getBlog(params['id']);
      }
    )
  }


}
