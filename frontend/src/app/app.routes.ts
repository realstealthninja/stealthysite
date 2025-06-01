import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { BlogsComponent } from './blogs/blogs.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", redirectTo: '/' },
    { path: "projects", component: ProjectsComponent},
    { path: "blogs", component: BlogsComponent}
];
