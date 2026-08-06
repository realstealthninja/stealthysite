import { Component, inject } from '@angular/core';
import { BloggingService } from '../../../services/blogging/blogging.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Blog } from '../../../interfaces/blog';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blog-home',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.css'
})
export class BlogHomeComponent {
  private bloggingService: BloggingService = inject(BloggingService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  blogs$: Observable<Blog[]> = this.bloggingService.getBlogs();
}
