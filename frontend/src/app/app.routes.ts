import { RedirectCommand, Router, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BlogRoutedRendererComponent } from './pages/blogs/blog-routed-renderer/blog-routed-renderer.component';
import { BlogEditorComponent } from './pages/blogs/blog-editor/blog-editor.component';
import { BlogHomeComponent } from './pages/blogs/blog-home/blog-home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserService } from './services/user/user.service';
import { inject, resource } from '@angular/core';
import { UserauthService } from './services/userauth/userauth.service';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/' },
  { path: 'projects', component: ProjectsComponent },
  {
    path: 'blogs',
    component: BlogsComponent,
    children: [
      { path: '', component: BlogHomeComponent },
      { path: 'editor', component: BlogEditorComponent },
      { path: ':id', component: BlogRoutedRendererComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    resources: (ctx) => {
      const userService = inject(UserService);
      const userAuthService = inject(UserauthService);
      const router = inject(Router);

      return {
        user: resource({
          params: () => ctx.params()['username'],
          loader: async ({ params: username }) => {
            const user =
              username === 'me'
                ? await userAuthService.loggedinUser()
                : await userService.getUsersByUsername(username);

            if (!user) {
              throw new RedirectCommand(router.parseUrl('home'));
            }
            return user;
          },
        }),
      };
    },
  },
];
