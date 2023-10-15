import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginOrSignUp = true;
  signUpForm: FormGroup;
  signUpSuccessMsg = ''

  loginForm: FormGroup

  changepage(){
    this.loginOrSignUp = this.loginOrSignUp?false:true
  }


  constructor(
    private fb: FormBuilder,
    private myService:MyServiceService
    ) {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });

    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSignUp() {
    let userDetails:Object = {};
    let email:string = this.signUpForm.get('email')?.value;
    let password:string = this.signUpForm.get('confirmPassword')?.value;
    userDetails = {
      'email' : email,
      'password' : password
    }
    console.log(userDetails)

    this.myService.postData(userDetails).subscribe((res)=>{
      this.signUpSuccessMsg = res.message
    })
  }
}
