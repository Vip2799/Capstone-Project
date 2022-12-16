import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { favlist } from '../models/favlist';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  constructor(private http: HttpClient) { }

  URL: string = "http://localhost:8081/favourite/";

  createFavList(favListName:string){
    return this.http.post(`http://localhost:8081/favourite/favList/${localStorage.getItem("emailId")}`,favListName)
  }

  addMovieToFav(email: string, listName: string, movie: Movie) {
    console.log(email, listName, movie);
    return new Promise((res, rej) => {
      this.http.post(this.URL + 'favList/addMovie/' + email + '/' + listName, movie).subscribe(data => {
        if (data) {
          res(data);
        }
        else {
          rej();
        }

      })
    });
  }

  getFavListByListName(listName: any) {
    return this.http.get<any>(this.URL + 'favList/get/vipul@gmail.com/' + listName);
  }

  getFavListByName2(listName:any){
    return new Promise((res,rej)=>{
      this.http.get(this.URL+'favList/get/vipul@gmail.com/'+listName).subscribe(data=>{
        res(data);
      })
    });
  }

  getAcc() {
    return this.http.get<any>(this.URL + 'getAccount/vipul@gmail.com');
  }


  deleteFavList(listName: any) {
    return this.http.delete<any>(this.URL + 'favList/delete/' + localStorage.getItem('email'), listName);
  }

  deleteMovieFromList(listname: any, id: any) {
    return this.http.delete<any>(this.URL + 'favList/deleteMovie/vipul@gmail.com/' + listname + '/' + id);
  }

  getFavListAcc(){
    return new Promise((res,rej)=>{
      this.http.get<any>(this.URL+'getAccount/vipul@gmail.com').subscribe(data=>{
        res(data);
      })
    })
  }
}
