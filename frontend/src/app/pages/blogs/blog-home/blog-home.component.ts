import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { BloggingService } from '../../../services/blogging/blogging.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Blog } from '../../../interfaces/blog';
import { AsyncPipe } from '@angular/common';
import { UserauthService } from '../../../services/userauth/userauth.service';

@Component({
  selector: 'app-blog-home',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './blog-home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './blog-home.component.css',
})
export class BlogHomeComponent {
  private bloggingService: BloggingService = inject(BloggingService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  userAuth: UserauthService = inject(UserauthService);
  blogs$: Observable<Blog[]> = this.bloggingService.getBlogs();
}
