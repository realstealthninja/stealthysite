import { Component } from '@angular/core';

@Component({
    selector: 'app-theme-switcher',
    imports: [],
    templateUrl: './theme-switcher.component.html',
    styleUrl: './theme-switcher.component.css'
})
export class ThemeSwitcherComponent {
  toggle_theme() {
    if (localStorage.getItem('theme') === 'light') {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    const theme = localStorage.getItem('theme');
    const rules = document.styleSheets[0].cssRules;

    for (let i = 0; i < rules.length - 1; i++) {
      if (!(rules.item(i) instanceof CSSMediaRule)) {
        continue;
      }

      const rule: CSSMediaRule | null = rules.item(i) as CSSMediaRule | null;

      if (rule!.media.mediaText.includes('prefers-color-scheme')) {
        continue;
      }
      
      const media = rule!.media;
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
