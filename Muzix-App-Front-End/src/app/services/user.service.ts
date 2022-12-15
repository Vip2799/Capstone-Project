import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient) { }
  baseUrl:String = "http://localhost:8092/user/v1/"
  baseUrl1:String = "http://localhost:8081/api/"

  // registerUser(user:user){
  //     return this.http.post("http://localhost:8083/api/register",user);
    
  // }
  registerUser(userObject:any){
    return  this.http.post(this.baseUrl1+"register",userObject);
   }
  
  loginCheck(userobj:any){
    return this.http.post(this.baseUrl+"login",userobj);
  }

  getGenres(){
    return new Promise((res,rej)=>{
      let response = null;
       this.http.get("https://api.themoviedb.org/3/genre/movie/list?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US").subscribe(result =>{
        response = result ;
        // console.log(result);
        res(response);

      })
      // console.log(response);

      // if(response){
      //   res(response);
      // }else{
      //   console.log(response);
      //   rej("error");
      // }
    })
  }

}
