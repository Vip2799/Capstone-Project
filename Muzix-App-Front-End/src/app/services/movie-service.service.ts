import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http:HttpClient) { }

  baseUrl:String = "http://localhost:8080/movie/api/v1/"


  addPopularMovies( movieList:any){
    let httpHeaders=new HttpHeaders({
      'Authorization' : 'Bearer' +localStorage.getItem('jwt')
     });
     let requestToken={ headers : httpHeaders }
     return this.http.post(this.baseUrl+"addpopularmovies",movieList,requestToken)
  }

  addFreeMovies( movieList:any){
    let httpHeaders=new HttpHeaders({
      'Authorization' : 'Bearer' +localStorage.getItem('jwt')
     });
     let requestToken={ headers : httpHeaders }
     return this.http.post(this.baseUrl+"addfreemovies",movieList,requestToken)
  }

  addTrendingMovies( movieList:any){
    let httpHeaders=new HttpHeaders({
      'Authorization' : 'Bearer' +localStorage.getItem('jwt')
     });
     let requestToken={ headers : httpHeaders }
     return this.http.post(this.baseUrl+"addtrendingmovies",movieList,requestToken)
  }

  addMovies( movie:any){
    let httpHeaders=new HttpHeaders({
      'Authorization' : 'Bearer' +localStorage.getItem('jwt')
     });
     let requestToken={ headers : httpHeaders }
     return this.http.post(this.baseUrl+"addmovie",movie,requestToken)
  }

  deleteMovie(movieId:number){
    let httpHeaders=new HttpHeaders({
      'Authorization' : 'Bearer' +localStorage.getItem('jwt')
     });
     let requestToken={ headers : httpHeaders }
     return this.http.delete(this.baseUrl+"delete/"+movieId,requestToken)
  }

  updateMoviesList(movieList:any){
    let httpHeaders=new HttpHeaders({
      'Authorization' : 'Bearer' +localStorage.getItem('jwt')
     });
     let requestToken={ headers : httpHeaders }
     return this.http.post(this.baseUrl+"updateMovieList",movieList,requestToken)
  }

  deleteAllMovie(movieId:number){
    let httpHeaders=new HttpHeaders({
      'Authorization' : 'Bearer' +localStorage.getItem('jwt')
     });
     let requestToken={ headers : httpHeaders }
     return this.http.delete(this.baseUrl+"deleteAll",requestToken)
  }

  getAllMovies(){
    let httpHeaders=new HttpHeaders({
      'authorization' : 'Bearer' +localStorage.getItem('jwt')
     });
     let requestToken={ headers : httpHeaders }
     console.log(requestToken)
     return this.http.get(this.baseUrl+"allmovies",requestToken)
  }

  getMovieById(id:number){
      return new Promise((res,rej)=>{
        this.http.get("http://localhost:8080/movie/"+id).subscribe(data=>{
          res(data);
        })

      })
  }
}
