import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Webgl } from '../webgl/webgl';
import { combineLatest } from 'rxjs';
import { VERSION } from '@angular/core';
import {version} from '../../../package.json';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  angular_version = VERSION.full;
  project_version = version;
}
