import { Component } from '@angular/core';
import { VERSION } from '@angular/core';
import project from '../../../package.json';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [],
})
export class HomeComponent {
  angular_version = VERSION.full;
  project_version = project.version;

}
