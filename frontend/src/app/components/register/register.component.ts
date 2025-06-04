import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {

    this.registrationForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8), Validators.pattern("/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/")],
      email: ['', Validators.required, Validators.email],
    })

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
    
  }
}
