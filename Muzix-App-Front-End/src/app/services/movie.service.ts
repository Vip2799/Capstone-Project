import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }
  baseUrl:String = "http://localhost:8080/movie/api/v1/"

  getMovieById(id:number){
    return new Promise((res,rej)=>{
      this.http.get("http://localhost:8080/movie/"+id).subscribe(data=>{
        res(data);
      })

    })
  }

  getAllMovies(){
    let httpHeaders=new HttpHeaders({
      'authorization' : 'Bearer' +localStorage.getItem('jwt')
     });
     let requestToken={ headers : httpHeaders }
     console.log(requestToken)
     return this.http.get(this.baseUrl+"allmovies",requestToken)
  }
}
