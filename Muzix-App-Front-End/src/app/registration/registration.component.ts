import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CanDeactiveGuard } from '../guards/can-deactive.guard';
import { UserService } from '../services/user.service';
import { passwordMisMatch } from '../validations/passwordMisMatch';
import { passwordValidation } from '../validations/passwordValidation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userform:boolean = true;
  address:boolean = false;
  register:boolean = false;
  count:number = 0 ;
  nextForm(){
    if(this.userform){
      this.userform = false ;
      this.address = true ;
      // this.count++ ;
    }else{
      this.address = false ;
      this.register = true ;
    }
  }
  prevbtn(){
    if(this.address){
      this.userform=true;
      this.address = false;
    }else{
      this.address= true;
      this.register= false;
    }
  }

  registrationForm = this.fb.group({
    userName: ["", [Validators.required,Validators.pattern(/[A-Za-z0-9]{6,20}/)]],
    email: ["", [Validators.required,Validators.email]],
    age: [null, [Validators.required, Validators.min(1)]],
    mobileNo: [null, [Validators.required,Validators.pattern(/^[789]\d{9,9}$/)]],
    streetName: ["", Validators.required],
    city: ["", Validators.required],
    state: ["", Validators.required],
    pinCode: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]
    ],
    password: [null,[ Validators.required, passwordValidation]],
    confirmPassword: [null, Validators.required]
  },{
    validator : [passwordMisMatch]
  });

  get userName(){
    return this.registrationForm.get('userName');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get age(){
    return this.registrationForm.get('age');
  }
  get mobileNo(){
    return this.registrationForm.get('mobileNo');
  }
  get streetName(){
    return this.registrationForm.get('streetName');
  }
  get city(){
    return this.registrationForm.get('city');
  }
  get state(){
    return this.registrationForm.get('state');
  }
  get pinCode(){
    return this.registrationForm.get('pinCode');
  }
  get password(){
    return this.registrationForm.get('password');
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }


  states = [
    'Maharashtra',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhatisagarh',
    'Goa',
    'Gujarat',
    'Harayana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Manipur',
    'Punjab',
    'Rajsthan'
    
  ];

  url:string = "../../assets/defaultprofile.jpg"

  uploadProfile(file:any){
    if(file.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload=(event:any)=>{
        this.url = event.target.result;
      }
    }
    const filedata = file.target.files[0];
    console.log(filedata)
    console.log(file);
  }
  constructor(private guard: CanDeactiveGuard,private fb: FormBuilder, private snackvar:MatSnackBar,private router:Router, private regUser: UserService, private snackbar: MatSnackBar) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // document.documentElement.scrollTop = 10
  }
  loading:boolean=false
  onSubmit(): void {
    this.loading=true;
    this.regUser.registerUser({
      email: this.email?.value,
      userName: this.userName?.value,
      password : this.password?.value,
      profilePic : this.url,
      age : this.age?.value,
      mobileNo : this.mobileNo?.value,
      address : {
        streetName:this.streetName?.value,
        city:this.city?.value,
        state:this.state?.value,
        pincode:this.pinCode?.value
      }
    }).subscribe(data => {
      console.log(data);
      this.guard.saved = true ;
      this.router.navigate(["login"]);
      this.snackbar.open("Registration Successfull",": )", {duration:3000});
    })
   
  }
}
