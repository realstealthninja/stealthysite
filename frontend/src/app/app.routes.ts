import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogRendererComponent } from './components/blog-renderer/blog-renderer.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", redirectTo: '/' },
    { path: "projects", component: ProjectsComponent},
    { path: "blogs", component: BlogsComponent},
    { path: "blogs/:id", component: BlogRendererComponent},
    { path: "login", component: LoginComponent},
    { path: "register", component: RegisterComponent},
    { path: "profile", component: RegisterComponent}
];
