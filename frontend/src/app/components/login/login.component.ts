import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private userAuth: UserauthService
  ) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      username: ['', [Validators.required]],
    })

  }

  get password() {
    return this.loginForm.get('password');
  }

  get username() {
    return this.loginForm.get('username')
  }
  onSubmit(_: FormData) {

    const user: LoginDTO = {
      username: this.username?.value,
      password: this.password?.value
    }
    
    this.userAuth.loginUser(user);
  }
}
