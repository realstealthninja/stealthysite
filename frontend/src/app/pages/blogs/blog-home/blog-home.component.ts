import { Component, inject } from '@angular/core';
import { BloggingService } from '../../../services/blogging/blogging.service';
import { RouterLink } from '@angular/router';
import { UserauthService } from '../../../services/userauth/userauth.service';

@Component({
  selector: 'app-blog-home',
  imports: [RouterLink],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.css',
})
export class BlogHomeComponent {
  private bloggingService: BloggingService = inject(BloggingService);

  userAuth: UserauthService = inject(UserauthService);
  blogs = this.bloggingService.getBlogs();
}
