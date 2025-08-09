import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { GlslComponent } from "./components/glsl/glsl.component";
import { ThemeSwitcherComponent } from "./components/theme-switcher/theme-switcher.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        NavbarComponent,
        GlslComponent,
        ThemeSwitcherComponent,
        FooterComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
}
