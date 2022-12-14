import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    console.log(movie);
    return this.http.post<any>(this.URL+'favList/addMovie/vipul@gmail.com/'+listName,movie);

  }

  get(listName:any){
    return this.http.get<any>(this.URL+'favList/get/vipul@gmail.com/'+listName);
  }

  getAcc(){
    return this.http.get<any>(this.URL+'getAccount/vipul@gmail.com');
  }


  deleteFavList(listName:any){
    return this.http.delete<any>(this.URL+'favList/delete/'+localStorage.getItem('email'),listName);
  }

  deleteMovieFromList(listName:any, id:any){
    return this.http.delete<any>(this.URL+'favList/deleteMovie/'+localStorage.getItem('email')+listName+id);
  }
}
