import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/user';

@Service()
export class UserService {
  private apiUrl = environment.apiUrlBase + 'users';
  private httpClient = inject(HttpClient);

  getUserByUsername(username: string) {
    return httpResource<{ total: number; users: User[] }>(
      () => `${this.apiUrl}/?username=${username}`,
    );
  }
}
