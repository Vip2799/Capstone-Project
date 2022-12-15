import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class Favourite1Service {

  URL:string = "http://localhost:8081/favourite/";


  constructor( private http:HttpClient) { }

  getFavListByName(listName:any){
    return new Promise((res,rej)=>{
      this.http.get(this.URL+'favList/get/vipul@gmail.com/'+listName).subscribe(data=>{
        res(data);
      })
    });
  }

  getMovieList(obj:any){
    let resp =  this.http.get<any>("http://localhost:8081/favourite/favList/get/vipul@gmail.com/bollywood");
    resp.subscribe(data=>{
      console.log(data);
    })
  }

  getFavListAcc(){
    return new Promise((res,rej)=>{
      this.http.get<any>(this.URL+'getAccount/vipul@gmail.com').subscribe(data=>{
        res(data);
      })
    })
  }

  addMovieToFav(email:string,listName:string,movie:Movie){
    console.log(email,listName,movie);
    return new Promise((res,rej)=>{
      this.http.post(this.URL+'favList/addMovie/'+email+'/'+listName,movie).subscribe(data=>{
        res(data);
      })
    });
  }

  addMovieToFav2(email:string, listName:string,movie:Movie){
    let result = this.http.post("http://localhost:8081/favourite/favList/addMovie/vipul@gmail.com/hello",movie);
    console.log("inside post");
    console.log(result);
    return result;
  }
}
