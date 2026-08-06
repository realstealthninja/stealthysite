import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Blog } from '../../interfaces/blog';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card.component.css',
})
export class CardComponent {
  title = input.required<string>();
  blog = input<Blog>();
  description = input<string>();


  calculateReadTime(content: string): number {
    return Math.ceil(content.split(" ").length / 260)
  }
}
