import { Component, inject, signal } from '@angular/core';
import { BloggingService } from '../../../services/blogging/blogging.service';
import { Observable } from 'rxjs/internal/Observable';
import { Blog } from '../../../interfaces/blog';
import { ActivatedRoute } from '@angular/router';
import { BlogMarkdownRendererComponent } from "../blog-markdown-renderer/blog-markdown-renderer.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blog-routed-renderer',
  imports: [BlogMarkdownRendererComponent, AsyncPipe],
  templateUrl: './blog-routed-renderer.component.html',
  styleUrl: './blog-routed-renderer.component.css'
})
export class BlogRoutedRendererComponent {
  private bloggingService: BloggingService = inject(BloggingService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  id = signal<number | null>(null);
  blog$: Observable<Blog> | undefined;


  constructor() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.id.set(params['id'])
        this.blog$ = this.bloggingService.getBlog(params['id']);
      }
    )
  }
}
