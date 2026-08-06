import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MarkdownPipe } from 'ngx-markdown';
import { Blog } from '../../../interfaces/blog';

@Component({
  selector: 'app-blog-markdown-renderer',
  imports: [AsyncPipe, MarkdownPipe],
  templateUrl: './blog-markdown-renderer.component.html',
  styleUrl: './blog-markdown-renderer.component.css'
})
export class BlogMarkdownRendererComponent {
  blog$ = input<Blog | null>();
}
