import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerDTO } from '../../interfaces/registerDTO';
import { LoginDTO } from '../../interfaces/LoginDTO';
import { JwtDTO } from '../../interfaces/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {
  private httpClient = inject(HttpClient);

  private apiURL = "/api/v1/users"

  get isLoggedIn(): boolean {
    return localStorage.getItem("jwt") !== null;
  }

  registerUser(user: registerDTO) {
    this.httpClient.post<JwtDTO>(`${this.apiURL}/register`, user).subscribe({
      next: (data: JwtDTO) => {
        localStorage.setItem("jwt", data.jwt);
      },

      error: (error) => {
        console.error(error);

      }
    }
    )
  }

  loginUser(user: LoginDTO) {
    this.httpClient.post<JwtDTO>(`${this.apiURL}/login`, user).subscribe({
      next: (data: JwtDTO) => {
        localStorage.setItem("jwt", data.jwt);

      },

      error: (error) => {
        console.log(error)
      }

    });
  }

  logoutUser() {
    localStorage.removeItem("jwt");
  }

}
