import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserauthService } from '../userauth/userauth.service';
import { Blog } from '../../interfaces/blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloggingService {
  private httpClient: HttpClient = inject(HttpClient);
  private userAuth: UserauthService = inject(UserauthService);

  private apiUrl: string = "/api/v1/blogs/"

  getBlogs(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>(this.apiUrl);
  }
}
