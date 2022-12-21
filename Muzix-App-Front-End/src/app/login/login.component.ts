import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode"
import { LoginAuthService } from '../services/login-auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private fb:FormBuilder,private router:Router,private _snackBar:MatSnackBar,private userService:UserService,private loginauth:LoginAuthService) { }

  ngOnInit(): void {
    // console.log(localStorage.getItem("emailId"))
    // console.log(localStorage.getItem("jwt"))
  }
  loginForm = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
   });

   get email() { return this.loginForm.get("email") }
   get password() { return this.loginForm.get("password") }

   decodeData:any;
   decodeEmail:any;
   data:any;

   onSubmit(){
    this.userService.loginCheck(this.loginForm.value).subscribe(
      response =>{ 

        this.loginauth.login();
        console.log(response);
        this.data=response;
        
    console.log(this.data.token);
    this.decodeData= jwt_decode(this.data.token);
    console.log(this.decodeData);
    this.decodeEmail=this.decodeData.sub;
    console.log(this.decodeEmail);
        localStorage.setItem('emailId',this.decodeEmail);
        localStorage.setItem('jwt',this.data.token);
      //  alert('Login success');
      this._snackBar.open('Congrats, you have successfully  LogedIn!!', 'success', {
        duration: 3000,​
         panelClass: ['mat-toolbar', 'mat-primary'] ​
       }) 
      // window.location.reload();
      this.router.navigate(["/home"]).then(()=>{
        window.location.reload();
      })
      },
      (error) =>{
        if(error.response = 404){
          console.log(error.response)
          this._snackBar.open('Username Or Password is Invalid!!', 'LoginFailed', {​
            duration: 5000,​
             panelClass: ['mat-toolbar', 'mat-primary'] ​
           }) 
        }else{
          console.log(error.response)
          this._snackBar.open('Network issue Please Try Again!!', 'LoginFailed', {​
            duration: 5000,​
             panelClass: ['mat-toolbar', 'mat-primary'] ​
           }) 
        }
        
      }
    )
    
    
  }
}