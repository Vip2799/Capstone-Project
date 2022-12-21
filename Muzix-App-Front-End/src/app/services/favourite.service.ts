import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { favlist } from '../models/favlist';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  constructor(private http: HttpClient) { }

  URL: string = "http://localhost:9000/favourite/";

  createFavList(favListName:string){
    return this.http.post("http://localhost:9000/favourite/favList/"+localStorage.getItem("emailId"),favListName)
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
    return this.http.get<any>(`${this.URL}favList/get/${localStorage.getItem("emailId")}/ ${listName}`);
  }

  getFavListByName2(listName:any){
    return new Promise((res,rej)=>{
      this.http.get(`${this.URL}favList/get/${localStorage.getItem("emailId")}/${listName}`).subscribe(data=>{
        res(data);
      })
    });
  }

  getAcc() {
    return this.http.get<any>(`${this.URL}getAccount/${localStorage.getItem("emailId")}`);
  }


  deleteFavList(listName: any) {
    return this.http.delete<any>(`${this.URL}favList/delete/${localStorage.getItem("emailId")}`, listName);
  }

  deleteMovieFromList(listname: any, id: any) {
    return this.http.delete<any>(`${this.URL}favList/deleteMovie/${localStorage.getItem("emailId")}/${listname}/${id}` );
  }

  getFavListAcc(){
    return new Promise((res,rej)=>{
      this.http.get<any>(`${this.URL}getAccount/${localStorage.getItem("emailId")}`).subscribe(data=>{
        res(data);
      })
    })
  }
}
