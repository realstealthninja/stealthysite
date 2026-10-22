import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MarkdownPipe } from 'ngx-markdown';
import { Blog } from '../../../interfaces/blog';

@Component({
  selector: 'app-blog-renderer',
  imports: [AsyncPipe, MarkdownPipe],
  templateUrl: './blog-renderer.component.html',
  styleUrl: './blog-renderer.component.css',
})
export class BlogRendererComponent {
  blog$ = input<Blog | null>();
}
