import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm = this.fb.group({
    userName: ["Vipul", Validators.required],
    email: ["vipulnavale9@gmail.com", Validators.required],
    age: [23, Validators.required],
    mobileNo: [7719864450, Validators.required],
    streetName: ["FC road", Validators.required],
    city: ["Pune", Validators.required],
    state: ["Maharashtra", Validators.required],
    postalCode: [411043, Validators.compose([
      Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    ]
  });

  edit:boolean = true;

  editProfile(){
    if(this.edit){
      this.edit = false;
    }else{
      this.edit = true;
    }
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

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    alert('Thanks!');
  }
}
