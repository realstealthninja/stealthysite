import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private apiURL = "/api/v1/version"

  constructor(private httpClient: HttpClient) { }

  getSpringVersion() {
    return this.httpClient.get<string>(`${this.apiURL}/spring`);
  }
  
}
