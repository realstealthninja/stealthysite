import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogRoutedRendererComponent } from './components/blogs/blog-routed-renderer/blog-routed-renderer.component';
import { BlogEditorComponent } from './components/blogs/blog-editor/blog-editor.component';
import { BlogHomeComponent } from './components/blogs/blog-home/blog-home.component';

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
