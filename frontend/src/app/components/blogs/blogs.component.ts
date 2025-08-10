import { Component, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BloggingService } from '../../services/blogging/blogging.service';
import { Blog } from '../../interfaces/blog';
import { Observable, single } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BlogRendererComponent } from "../blog-renderer/blog-renderer.component";

@Component({
    selector: 'app-blogs',
    imports: [RouterLink, AsyncPipe],
    templateUrl: './blogs.component.html',
    styleUrl: './blogs.component.css'
})
export class BlogsComponent {
    private bloggingService: BloggingService = inject(BloggingService);
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

    blogs$: Observable<Blog[]> = this.bloggingService.getBlogs();
}
