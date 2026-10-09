import { Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/user';

@Service()
export class UserService {
  private apiUrl = environment.apiUrlBase + 'users';

  getUsersByUsername(username: string) {
    return fetch(`${this.apiUrl}/?username=${username}`).then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json() as Promise<User>;
    });
  }
}
