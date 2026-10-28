import { RedirectCommand, Router, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BlogHomeComponent } from './pages/blogs/blog-home/blog-home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserService } from './services/user/user.service';
import { inject, resource } from '@angular/core';
import { UserauthService } from './services/userauth/userauth.service';
import { BlogRendererComponent } from './pages/blogs/blog-renderer/blog-renderer.component';
import { BlogUploadComponent } from './pages/blogs/blog-upload/blog-upload.component';
import { BloggingService } from './services/blogging/blogging.service';
import { bloggerGuard } from './guards/blogger/blogger.guard';
import { User } from './interfaces/user';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/' },
  { path: 'projects', component: ProjectsComponent },
  {
    path: 'blogs',
    component: BlogsComponent,
    children: [
      {
        path: '',
        component: BlogHomeComponent,
        resources: () => {
          const userService = inject(UserService);
          const bloggingService = inject(BloggingService);
          const router = inject(Router);

          const authors: User[] = [];

          return {
            blogs: resource({
              loader: async () => {
                const blogs = (await bloggingService.getBlogs())?.blogs;
                if (!blogs) {
                  throw new RedirectCommand(router.parseUrl('home'));
                }

                return blogs;
              },
            }),
            authors: resource({
              loader: async () => {
                const blogs = (await bloggingService.getBlogs())?.blogs;
                if (!blogs) {
                  throw new RedirectCommand(router.parseUrl('home'));
                }

                blogs.forEach(async (blog) => {
                  if (!authors.some((user) => user.id === blog.author)) {
                    const author = await userService.getUser(blog.author);
                    if (!author)
                      throw new RedirectCommand(router.parseUrl('home'));
                    authors.push(author);
                  }
                });
                return authors;
              },
            }),
          };
        },
      },
      {
        path: 'new',
        component: BlogUploadComponent,
        canActivate: [bloggerGuard],
      },
      {
        path: ':id',
        component: BlogRendererComponent,
        resources: (ctx) => {
          return {
            blogId: resource({
              params: () => ctx.params()['id'],
              loader: async ({ params: id }) => {
                return id;
              },
            }),
          };
        },
      },
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
      const bloggingService = inject(BloggingService);
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
        me: resource({
          params: () => ctx.params()['username'],
          loader: async ({ params: username }) => {
            return username === 'me';
          },
        }),
        blogs: resource({
          params: () => ctx.params()['username'],
          loader: async ({ params: username }) => {
            const user =
              username === 'me'
                ? await userAuthService.loggedinUser()
                : await userService.getUsersByUsername(username);
            if (!user) {
              throw new RedirectCommand(router.parseUrl('home'));
            }
            const blogs = await bloggingService.getBlogsByAuthor(
              user?.username,
            );

            if (!blogs) {
              return [];
            } else {
              return blogs['blogs'];
            }
          },
        }),
      };
    },
  },
];
