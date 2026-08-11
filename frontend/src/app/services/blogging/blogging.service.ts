import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserauthService } from '../userauth/userauth.service';
import { Blog } from '../../interfaces/blog';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BloggingService {
  private httpClient: HttpClient = inject(HttpClient);
  private userAuth: UserauthService = inject(UserauthService);

  private apiUrl = environment.apiUrlBase + 'blogs';

  getBlogs() {
    return httpResource<{ blogs: Blog[] }>(() => `${this.apiUrl}/`);
  }

  getBlog(id: number) {
    return httpResource<Blog>(() => `${this.apiUrl}/${id}`);
  }
}
