import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { favlist } from '../models/favlist';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  constructor(private http:HttpClient) { }

  URL:string = "http://localhost:8081/favourite/";

  create(listName:any){
    return this.http.post<any>(this.URL+'favList/vipul@gmail.com',listName);
  }

  add(listName:any, movie:any){
    // console.log(movie);
    let response = this.http.post<any>(this.URL+'favList/addMovie/vipul@gmail.com/'+listName,movie);
    response.subscribe(data=>{
      console.log("insidepost",data);
    })
    return response
  }

  get(listName:any){
    console.log(listName);
    var response = this.http.get<any>(this.URL+'favList/get/vipul@gmail.com/'+listName);
    console.log("in service")
    console.log(response.subscribe(data=>{
      console.log(data);
    }));
    return response;
  }

  getMovieList(obj:any){
    let resp =  this.http.get<any>("http://localhost:8081/favourite/favList/get/vipul@gmail.com/bollywood");
    resp.subscribe(data=>{
      console.log(data);
    })
  }

  getAcc(){
    return this.http.get<any>(this.URL+'getAccount/vipul@gmail.com');
  }


  deleteFavList(listName:any){
    return this.http.delete<any>(this.URL+'favList/delete/'+localStorage.getItem('email'),listName);
  }

  deleteMovieFromList( id:any){
    return this.http.delete<any>(this.URL+'favList/deleteMovie/vipul@gmail.com/'+id);
  }
}
