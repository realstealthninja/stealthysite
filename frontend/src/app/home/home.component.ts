import { Component } from '@angular/core';
import { VERSION } from '@angular/core';
import {version} from '../../../package.json';
import { GlslComponent } from "../glsl/glsl.component";


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [GlslComponent],
})
export class HomeComponent {
  angular_version = VERSION.full;
  project_version = version;

}
