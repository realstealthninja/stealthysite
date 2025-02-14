import { Component, VERSION } from '@angular/core';
import project from '../../../package.json';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  angular_version = VERSION.full;
  project_version = project.version;
}
