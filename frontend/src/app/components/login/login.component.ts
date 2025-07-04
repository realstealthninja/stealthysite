import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginDTO } from '../../interfaces/LoginDTO';
import { UserauthService } from '../../services/userauth/userauth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private userAuth: UserauthService
  ) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      email: ['', [Validators.required, Validators.email]],
    })

  }

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email')
  }
  onSubmit(formData: FormData) {

    let user: LoginDTO = {
      email: this.email?.value,
      password: this.password?.value
    }
    console.log("hello");
    let hello = this.userAuth.loginUser(user).subscribe (
      result => {
        console.log(result);
      }
    );
    console.log(hello);
  }
}
