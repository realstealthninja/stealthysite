import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", redirectTo: '/' },
    { path: "projects", component: ProjectsComponent},
    { path: "blogs", component: BlogsComponent},
    { path: "login", component: LoginComponent},
    { path: "register", component: RegisterComponent}
];
