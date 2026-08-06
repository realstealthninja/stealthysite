import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-blogs',
    imports: [RouterOutlet],
    templateUrl: './blogs.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './blogs.component.css'
})
export class BlogsComponent {

}
