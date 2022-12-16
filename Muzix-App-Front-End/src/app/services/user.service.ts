import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient) { }

  baseUrl:String = "http://localhost:8092/user/v1/"
  baseUrl1:String = "http://localhost:8083/api/"

  registerUser(userData:any){
    return  this.http.post(this.baseUrl1+"register",userData);
   }
  
  loginCheck(userData:any){
    return this.http.post(this.baseUrl+"login",userData);
  }

  updateProfile(userData:any){
    return this.http.put(this.baseUrl1+"update/"+localStorage.getItem("emailId"),userData)
  }

  deleteProfile(userId:any){
    return this.http.delete(this.baseUrl1+userId)
  }

  getProfile(userId:any){
  
   return new Promise((resolve, reject) => {
    this.http.get(this.baseUrl1+"getProfile/"+userId).subscribe(data=>{
      resolve(data)
    })
   })
  }

  getGenres(){
    return new Promise((res,rej)=>{
      let response = null;
       this.http.get("https://api.themoviedb.org/3/genre/movie/list?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US").subscribe(result =>{
        response = result ;
        res(response);
      })
    })
  }

}
