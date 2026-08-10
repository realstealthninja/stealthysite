import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, httpResource } from '@angular/common/http';
import { UserLoginDTO, UserRegisterDTO } from '../../interfaces/user-dtos';
import { JwtDTO } from '../../interfaces/jwt-dto';
import { User } from '../../interfaces/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserauthService {
  private httpClient = inject(HttpClient);
  private apiURL = environment.apiUrlBase + 'users';

  get isLoggedIn(): boolean {
    return this.jwtToken !== null;
  }

  get jwtToken(): string | null {
    return localStorage.getItem('jwt');
  }

  addJwtAuth(header: HttpHeaders): HttpHeaders {
    header.set('Authorization', this.jwtToken === null ? '' : this.jwtToken);
    return header;
  }

  registerUser(user: UserRegisterDTO) {
    this.httpClient.post(`${this.apiURL}/register`, user).subscribe({
      error: (error) => {
        console.error(error);
      },
    });
  }

  loginUser(user: UserLoginDTO) {
    this.httpClient.post<JwtDTO>(`${this.apiURL}/login`, user).subscribe({
      next: (data: JwtDTO) => {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('id', data.id.toString());
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  loggedinUser() {
    return httpResource<User>(() => `${this.apiURL}/me`);
  }

  logoutUser() {
    localStorage.removeItem('jwt');
  }
}
