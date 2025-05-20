import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.css',
})
export class ThemeSwitcherComponent {
  toggle_theme() {
    if (localStorage.getItem('theme') === 'light') {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    var theme = localStorage.getItem('theme');
    var rules = document.styleSheets[0].cssRules;

    for (var i = 0; i < rules.length - 1; i++) {
      if (!(rules.item(i) instanceof CSSMediaRule)) {
        continue;
      }

      var rule: CSSMediaRule | null = <CSSMediaRule | null>rules.item(i);

      if (rule!.media.mediaText.includes('prefers-color-scheme')) {
        continue;
      }
      
      var media = rule!.media;
      switch (theme) {
        case 'light':
          media.appendMedium("original-prefers-color-scheme");
          if (media.mediaText.includes("light")) {
            media.deleteMedium("(prefers-color-scheme: light)");
          }
          if (media.mediaText.includes("dark")) {
            media.deleteMedium("(prefers-color-scheme: dark");
          }

          break;
        case 'dark':
          media.appendMedium("(prefers-color-scheme: light)");
          media.appendMedium("(prefers-color-scheme: dark)");
          if (media.mediaText.includes("original")) {
            media.deleteMedium("original-prefers-color-scheme");
          }
          break;
        default:
          media.appendMedium("(prefers-color-scheme: dark");
          if (media.mediaText.includes("light")) {
            media.deleteMedium("(prefers-color-scheme: light)");
          }
          if (media.mediaText.includes("original")) {
            media.deleteMedium("original-prefers-color-scheme");
          }
      }
    }
  }
}
