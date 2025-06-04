import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Version } from '../../interfaces/version';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private apiURL = "/api/v1/version"

  constructor(private httpClient: HttpClient) { }

  getSpringVersion() {
    return this.httpClient.get<Version>(`${this.apiURL}/spring`);
  }
  
  getJavaVersion() {
    return this.httpClient.get<Version>(`${this.apiURL}/java`);
  }
  
}
