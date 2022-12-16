import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode"
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private fb:FormBuilder,private router:Router,private _snackBar:MatSnackBar,private userService:UserService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("emailId"))
    console.log(localStorage.getItem("jwt"))
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
      response => {
        console.log(response);
        this.data=response;
        
    console.log(this.data.token);
    this.decodeData= jwt_decode(this.data.token);
    console.log(this.decodeData)
    this.decodeEmail=this.decodeData.sub;
    console.log(this.decodeEmail);
        localStorage.setItem('emailId',this.decodeEmail);
        localStorage.setItem('jwt',this.data.token);
      //  alert('Login success');
       this.router.navigate(["/home"]);
      }
    )
    
    this._snackBar.open('Congrats, you have successfully the LogedIn!!', 'success', {​
      duration: 3000,​
       panelClass: ['mat-toolbar', 'mat-primary']​
     }) 
    
  }
}
