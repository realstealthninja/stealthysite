import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/user';
import { HttpClient, httpResource } from '@angular/common/http';
import { UserauthService } from '../userauth/userauth.service';

@Service()
export class UserService {
  private apiUrl = environment.apiUrlBase + 'users';
  private httpClient = inject(HttpClient);
  private userAuth = inject(UserauthService);

  async getUsersByUsername(username: string) {
    const res = await fetch(`${this.apiUrl}/?username=${username}`);
    if (!res.ok) {
      return null;
    }
    return res.json() as Promise<User>;
  }

  async updateUser(user: {
    username?: string;
    password?: string;
    bio?: string;
  }) {
    const loggedinUser = await this.userAuth.loggedinUser();
    if (!loggedinUser) return;

    this.httpClient
      .patch(`${this.apiUrl}/${loggedinUser.id}`, user)
      .subscribe();
  }

  async getUser(id: string) {
    const user = await fetch(`${this.apiUrl}/${id}`);
    if (!user.ok) {
      return null;
    }
    return user.json() as Promise<User>;
  }

  async uploadAvatar(image: File) {
    const formData = new FormData();
    const loggedinUser = await this.userAuth.loggedinUser();
    if (!loggedinUser) return;
    formData.append('avatar', image);
    this.httpClient
      .patch(`${this.apiUrl}/${loggedinUser.id}/avatar`, formData)
      .subscribe();
  }

  avatarUrl(id: string): string {
    return `${this.apiUrl}/${id}/avatar`;
  }
}
