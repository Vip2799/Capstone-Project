import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { user } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // profile: any = {
  //   email: localStorage.getItem("emailId"),
  //   userName: "VipulTest",
  //   password: "",
  //   profilePic: "",
  //   age: 0,
  //   mobileNo: 0,
  //   address: {
  //     streetName: "",
  //     city: "",
  //     state: "",
  //     pincode: 0

  //   }
  // }


  profileForm = this.fb.group({
    userName: ["userName", Validators.required],
    email: ["vip", Validators.required],
    age: [0, Validators.required],
    mobileNo: [0, Validators.required],
    streetName: ["street name", Validators.required],
    city: ["city", Validators.required],
    state: ["state", Validators.required],
    postalCode: [0, Validators.compose([
      Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    ]
  });

  edit: boolean = true;

  editProfile() {
    if (this.edit) {
      this.edit = false;
    } else {
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

  constructor(private fb: FormBuilder, private userservice: UserService, private snackbar: MatSnackBar) { }
  ngOnInit(): void {
    // console.log(this.profile.email);
    // throw new Error('Method not implemented.');
    // this.profileForm.get('userName')?.value 
    // this.profileForm.ser
    let user: any = {}
    this.userservice.getProfile(localStorage.getItem("emailId")).then(data => {
      user = data;

      this.profileForm.patchValue({
        email: localStorage.getItem("emailId"),
        userName: user.userName,
        age: user.age,
        mobileNo: user.mobileNo,
        streetName: user.address.streetName,
        city: user.address.city,
        state: user.address.state,
        postalCode: user.address.pincode

      })

      this.profilePicUrl = user.profilePic ;

      // this.profile.address = user.address;
      // console.log(data);
      // console.log(user.address.city)
      // this.profile.userName = user.userName;
      // this.profile.email = user.email;
      // this.profile.age = user.age;
      // this.profile.mobileNo = user.mobileNo;
      // this.profile.address.city = user.address.city;
      // this.profile.address.pincode = user.address.pincode;
      // this.profile.address.streetName = user.address.streetName;
      // this.profile.address.state = user.address.state;
      // this.profilePicUrl = user.profilePic;
      // console.log(this.profile);
      // console.log(user);

    })
    // console.log(this.profile);

  }

  onSubmit(): void {

    this.userservice.getProfile(localStorage.getItem("emailId")).then((data: any) => {
      let updatedData = data;

      updatedData.userName = this.profileForm.get("userName")?.value;
      updatedData.age = this.profileForm.get("age")?.value;
      updatedData.mobileNo = this.profileForm.get("mobileNo")?.value;
      updatedData.address.city = this.profileForm.get("city")?.value;
      updatedData.address.streetName = this.profileForm.get("streetName")?.value;
      updatedData.address.state = this.profileForm.get("state")?.value;
      updatedData.address.pincode = this.profileForm.get("postalCode")?.value;
      updatedData.profilePic = this.profilePicUrl ;
      updatedData.userName = this.profileForm.get("userName")?.value;
      
      this.userservice.updateProfile(updatedData).subscribe(data => {
        console.log(data)
      });
      this.edit = true;
      this.snackbar.open("Profile updated Successfully !", "", { duration: 2500 })
      window.location.reload;

    })
    // alert('Thanks!');


  }
  profilePicUrl: string = "../../assets/defaultprofile.jpg";
  uploadProfile(file: any) {
    if (file.target.files) {

      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = (event: any) => {
        this.profilePicUrl = event.target.result;
      }
    }

  }
}
