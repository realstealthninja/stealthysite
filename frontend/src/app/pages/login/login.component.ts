import { Component, inject, signal } from '@angular/core';
import {
  form,
  minLength,
  required,
  FormField,
  pattern,
  FormRoot,
} from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { UserauthService } from '../../services/userauth/userauth.service';
import { UserLoginDTO } from '../../interfaces/user-dtos';

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink, FormRoot],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private userAuth = inject(UserauthService);
  private router = inject(Router);

  loginModel = signal<UserLoginDTO>({
    username: '',
    password: '',
  });

  loginForm = form(
    this.loginModel,
    (fieldPath) => {
      required(fieldPath.username, { message: 'Username is required' });
      required(fieldPath.password, { message: 'Password is required' });
      pattern(fieldPath.password, /^(?=\D*\d).*$/, {
        message: 'Password must contain atleast one number',
      });
      pattern(fieldPath.password, /(?=[^A-Z]*[A-Z]).*/, {
        message: 'password must contain atleast one uppercase character',
      });
      pattern(fieldPath.password, /^(?=[^a-z]*[a-z]).*$/, {
        message: 'Password should contain atleast one lowercase character',
      });
      pattern(
        fieldPath.password,
        /^(?=[^!$%^&*()_+|~=`{}[\]:";'<>?,./-]*[!$%^&*()_+|~=`{}[\]:";'<>?,./-]).*$/,
        { message: 'password should contain atleast one special symbol' },
      );
      minLength(fieldPath.password, 8, {
        message: 'Passwords should be atleast 8 characters long',
      });
    },
    {
      submission: {
        action: async (field) => {
          this.userAuth.loginUser(field().value()).subscribe({
            next: async () => {
              await this.router.navigate(['/profile']);
            },
            error: async () => {
              return { kind: 'servererror', message: 'failed to submit form' };
            },
          });
        },
      },
    },
  );
}
