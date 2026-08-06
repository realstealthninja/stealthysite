import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserauthService } from '../userauth/userauth.service';
import { Blog } from '../../interfaces/blog';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BloggingService {
  private httpClient: HttpClient = inject(HttpClient);
  private userAuth: UserauthService = inject(UserauthService);

  private apiUrl = environment.apiUrlBase + 'blogs';

  getBlogs(): Observable<Blog[]> {
    return this.httpClient
      .get<{ blogs: Blog[] }>(`${this.apiUrl}/`)
      .pipe(map((data) => data.blogs));
  }

  getBlog(id: number): Observable<Blog> {
    return this.httpClient.get<Blog>(`${this.apiUrl}/${id}`);
  }
}
