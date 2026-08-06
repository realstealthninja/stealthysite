import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.css',
})
export class ThemeSwitcherComponent implements OnInit {
  theme = 'dark';

  ngOnInit() {
    if (window.document.body.style.getPropertyValue('color-scheme') == 'dark') {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }
  }

  toggle_theme() {
    if (window.document.body.style.getPropertyValue('color-scheme') == 'dark') {
      window.document.body.style.setProperty('color-scheme', 'light');
      this.theme = 'light';
    } else {
      window.document.body.style.setProperty('color-scheme', 'dark');
      this.theme = 'dark';
    }
  }
}
