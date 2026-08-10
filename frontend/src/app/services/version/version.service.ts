import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VersionResp } from '../../interfaces/version';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  private apiURL = environment.apiUrlBase + 'version';

  getSpringVersion() {
    return httpResource<VersionResp>(() => `${this.apiURL}/spring`);
  }

  getJavaVersion() {
    return httpResource<VersionResp>(() => `${this.apiURL}/java`);
  }
}
