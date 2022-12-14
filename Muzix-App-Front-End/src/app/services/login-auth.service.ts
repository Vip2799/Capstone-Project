import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  isLoggedIn = false;

  login(){
    this.isLoggedIn = true;
  }

  logout(){
    this.isLoggedIn = false ;
  }
  constructor() { }
}
