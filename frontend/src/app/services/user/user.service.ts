import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Service()
export class UserService {
  private apiUrl = environment.apiUrlBase + 'users';
  private httpClient = inject(HttpClient);

  getUsersByUsername(username: string) {
    return fetch(`${this.apiUrl}/?username=${username}`).then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json() as Promise<User>;
    });
  }

  uploadAvatar(image: File) {
    const formData = new FormData();
    formData.append('avatar', image);
    this.httpClient.put(`${this.apiUrl}/avatar`, formData).subscribe();
  }

  avatarUrl(id: string): string {
    return `${this.apiUrl}/${id}/avatar`;
  }
}
