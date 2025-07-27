import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Version } from '../../interfaces/version';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private httpClient = inject(HttpClient);

  private apiURL = "/api/v1/version"

  getSpringVersion() {
    return this.httpClient.get<Version>(`${this.apiURL}/spring`);
  }
  
  getJavaVersion() {
    return this.httpClient.get<Version>(`${this.apiURL}/java`);
  }
  
}
