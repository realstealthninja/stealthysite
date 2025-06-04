import { Component, VERSION } from '@angular/core';
import project from '../../../../package.json';
import { VersionService } from '../../services/version/version.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  angular_version: string = VERSION.full;
  project_version: string = project.version;
  spring_version: string | null = null; 

  loading: boolean = true;

  constructor (private versionService: VersionService) {}

  ngOnInit(): void {
    this.versionService.getSpringVersion().subscribe({
      next: (version) => {
        this.spring_version = version;
        this.loading = false;
      },
      error: (err) => {
        console.log("backend is not online");
        this.loading = false;
      }
    })
  }
}
