import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BlogDTO, BlogModel } from '../../interfaces/blog';
import { environment } from '../../../environments/environment';
import { UserauthService } from '../userauth/userauth.service';
import { Blog } from '../../classes/blog/blog';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BloggingService {
  private userAuthService = inject(UserauthService);
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrlBase + 'blogs';

  async getBlogs() {
    const blogs = await fetch(`${this.apiUrl}/`);
    if (!blogs.ok) {
      return null;
    }
    return blogs.json() as Promise<{ blogs: BlogDTO[] }>;
  }

  async getBlogsByAuthor(username: string) {
    const res = await fetch(`${this.apiUrl}/?by=${username}`);
    if (!res.ok) {
      return null;
    }
    return res.json() as Promise<{ blogs: BlogDTO[] }>;
  }

  getBlog(id: string) {
    return this.httpClient
      .get<BlogDTO>(`${this.apiUrl}/${id}`)
      .pipe(map(Blog.fromJson));
  }

  deleteBlog(id: string) {
    if (!this.userAuthService.isLoggedIn) {
      return;
    }

    return this.httpClient
      .delete<undefined>(`${this.apiUrl}/${id}`)
      .subscribe();
  }

  putBlog(
    id: string,
    blogModel: { title: string; tags: string[]; content: string },
  ) {
    if (!this.userAuthService.isLoggedIn) {
      return;
    }
    return this.httpClient.put<BlogDTO>(`${this.apiUrl}/${id}`, blogModel);
  }

  postBlog(blogModel: BlogModel) {
    const formData = new FormData();

    if (!this.userAuthService.isLoggedIn) {
      return;
    }

    formData.append(
      'header',
      new Blob(
        [
          JSON.stringify({
            title: blogModel.title,
            tags: blogModel.tags,
          }),
        ],
        { type: 'application/json' },
      ),
    );
    formData.append('content', blogModel.content);

    this.httpClient.post(`${this.apiUrl}/new`, formData).subscribe();
  }
}
