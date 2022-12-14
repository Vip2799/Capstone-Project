import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient) { }


  registerUser(user:user){
      return this.http.post("http://localhost:8083/api/register",user);
    
  }

}
