import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BlogRoutedRendererComponent } from './pages/blogs/blog-routed-renderer/blog-routed-renderer.component';
import { BlogEditorComponent } from './pages/blogs/blog-editor/blog-editor.component';
import { BlogHomeComponent } from './pages/blogs/blog-home/blog-home.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", redirectTo: '/' },
    { path: "projects", component: ProjectsComponent},
    { path: "blogs", component: BlogsComponent,
      children: [

        {path: '', component: BlogHomeComponent},
        {path: 'editor', component: BlogEditorComponent},
        {path: ':id', component: BlogRoutedRendererComponent}
      ]
    },
    { path: "login", component: LoginComponent},
    { path: "register", component: RegisterComponent},
    { path: "profile", component: RegisterComponent}
];
