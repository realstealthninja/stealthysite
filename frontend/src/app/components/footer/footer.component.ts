import { Component, VERSION, OnInit, inject } from '@angular/core';
import project from '../../../../package.json';
import { VersionService } from '../../services/version/version.service';
import { catchError, EMPTY, forkJoin} from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  private versionService = inject(VersionService);

  angular_version: string = VERSION.full;
  project_version: string = project.version;
  spring_version: string | null = null;
  java_version: string | null = null;

  loading = true;

  ngOnInit(): void {
    forkJoin(
      {
        java: this.versionService.getJavaVersion(),
        spring: this.versionService.getSpringVersion()
      }
    ).pipe(
      catchError(
        err => {
          console.log(err);
          this.loading = false;
          return EMPTY;
        }
      )
    ).subscribe(
      result => {
        this.java_version = result.java.version;
        this.spring_version = result.spring.version;
        this.loading = false;
      }
    )
  }
}
