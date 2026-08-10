import { Component, VERSION, inject, effect } from '@angular/core';
import project from '../../../../package.json';
import { VersionService } from '../../services/version/version.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private versionService = inject(VersionService);

  angularVersion: string = VERSION.full;
  projectVersion: string = project.version;

  springVersion = this.versionService.getSpringVersion();
  javaVersion = this.versionService.getJavaVersion();
}
