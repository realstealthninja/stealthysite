import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { registerDTO } from '../../interfaces/registerDTO';
import { UserauthService } from '../../services/userauth/userauth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private userAuth = inject(UserauthService);

  registrationForm!: FormGroup;

  ngOnInit() {

    this.registrationForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/")]],
      email: ['', [Validators.required, Validators.email]],
    })

  }

  get firstname() {
    return this.registrationForm.get('firstname');
  }

  get lastname() {
    return this.registrationForm.get('lastname');
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get email() {
    return this.registrationForm.get('email')
  }

  onSubmit() {
    const user: registerDTO = {
      firstname: this.firstname?.value,
      lastname: this.lastname?.value,
      username: this.username?.value,
      password: this.password?.value,
      email: this.email?.value
    };

    
    const hello = this.userAuth.registerUser(user);
    console.log(hello);
  }
}
