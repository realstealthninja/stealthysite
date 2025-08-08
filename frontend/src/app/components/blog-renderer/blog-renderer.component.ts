import { Component, Input, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-renderer',
  imports: [MarkdownModule],
  templateUrl: './blog-renderer.component.html',
  styleUrl: './blog-renderer.component.css'
})
export class BlogRendererComponent {
  @Input()
  source!: string;
}
