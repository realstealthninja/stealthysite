import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLoginDTO, UserRegisterDTO } from '../../interfaces/user-dtos';
import { JwtDTO } from '../../interfaces/jwt-dto';
import { User } from '../../interfaces/user';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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

  get id(): string | null {
    return localStorage.getItem('id');
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

  loginUser(user: UserLoginDTO): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.httpClient.post<JwtDTO>(`${this.apiURL}/login`, user).subscribe({
        next: (data: JwtDTO) => {
          localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('id', data.id);

          subscriber.next(data.id);
        },

        error: (err) => {
          subscriber.error(err);
        },
      });
    });
  }

  async loggedinUser() {
    const user = await fetch(`${this.apiURL}/${localStorage.getItem('id')}`);
    if (!user.ok) {
      return null;
    }
    return user.json() as Promise<User>;
  }

  logoutUser() {
    this.httpClient.post(`${this.apiURL}/logout`, null).subscribe();
    localStorage.removeItem('jwt');
    localStorage.removeItem('id');
  }
}
