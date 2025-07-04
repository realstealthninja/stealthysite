import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerDTO } from '../../interfaces/registerDTO';
import { LoginDTO } from '../../interfaces/LoginDTO';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {
  private apiURL: string = "/api/v1/users"

  constructor(private httpClient: HttpClient) {}

  registerUser(user: registerDTO) {
    return this.httpClient.post(`${this.apiURL}/register`, user);
  }

  loginUser(user: LoginDTO) {
    return this.httpClient.post(`${this.apiURL}/login`, user);
  } 
  
}
