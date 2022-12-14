import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {


  registrationForm = this.fb.group({
    userName: ["", Validators.required],
    email: ["", Validators.required],
    age: [null, Validators.required],
    mobileNo: [null, Validators.required],
    streetName: ["", Validators.required],
    city: ["", Validators.required],
    state: ["", Validators.required],
    pinCode: [null, Validators.compose([
      Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    ],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required]
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
    return this.registrationForm.get('postalCode');
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
  constructor(private fb: FormBuilder, private regUser: UserService, private snackbar: MatSnackBar) {}

  onSubmit(): void {
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
      
    })
    this.snackbar.open("Registration Successfull",": )", {duration:3000});
  }
}
