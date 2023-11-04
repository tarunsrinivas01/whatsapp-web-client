import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

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
    private myService:MyServiceService,
    private router:Router
    ) {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      userName:['',Validators.required],
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
    let userName:string = this.signUpForm.get('userName')?.value;
    let password:string = this.signUpForm.get('confirmPassword')?.value;
    userDetails = {
      'email' : email,
      'userName' : userName,
      'password' : password
    }
    console.log(userDetails)

    this.myService.postData(userDetails).subscribe((res)=>{
      this.signUpSuccessMsg = res.message
    })
  }

  onLogin() {
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;

    let loginDetails = {
      email : email,
      password : password
    }

    this.myService.loginUser(loginDetails).subscribe((res:any)=>{
      console.log(res.status)
      if(res.success) {
        localStorage.setItem('token',res.token)
        this.router.navigate(['/user'])
      }
    })

  }
}
