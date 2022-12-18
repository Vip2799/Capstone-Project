import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { genre } from '../models/genre';
import { Movie } from '../models/Movie';
import { updatedMovieList } from '../models/updatedMovieList';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  currentMovieListToShow:any = [];

  constructor(private http: HttpClient, private userservice: UserService) { }
  baseUrl: String = "http://localhost:8080/movie/api/v1/"

  getMovieById(id: number) {
    return new Promise((res, rej) => {
      this.http.get(`${this.baseUrl}${id}`).subscribe(data => {
        res(data);
      })

    })
  }

  getAllMovies() {
    let httpHeaders = new HttpHeaders({
      'authorization': 'Bearer' + localStorage.getItem('jwt')
    });
    let requestToken = { headers: httpHeaders }
    // console.log(requestToken)
    return this.http.get(this.baseUrl + "allmovies", requestToken)
  }

  getUpdatedMovieList(){

    let httpHeaders = new HttpHeaders({
      'authorization': 'Bearer' + localStorage.getItem('jwt')
    });
    let requestToken = { headers: httpHeaders }
    // console.log(requestToken)
    // return 
    let allMovies:any = [];
    let genreList:any = [];
    let updatedMovieList: updatedMovieList[]=[];

    this.http.get(this.baseUrl + "allmovies", requestToken).subscribe(data=>{
      allMovies = data ;
      
      // this.recommendedMovieList = this.allMovies.slice(1,20)
      this.userservice.getGenres().then(data=>{
        genreList = data ;

        for(let i = 0 ; i < allMovies.length ; i++){
          let genreString: any[] = [];
          for(let genre of allMovies[i].genre_ids){
            // console.log(this.genreList)
              genreList.genres.forEach((data: any) =>{
                if(data.id == genre){
                 genreString.push(data);
                }
            })
          }
          allMovies[i].currentGenreList = genreString ;
          updatedMovieList.push(allMovies[i]);
        }
      })
      

    })
    return updatedMovieList ;
  }

  getRating(id: number, email: any) {
    return new Promise((res, rej) => {
      this.http.get(`${this.baseUrl}rating/${id}/${email}`).subscribe(data=>{
        res(data);
      })
    })
  }

  addRating(email:any,id:number,rating:number){
    return this.http.post(`${this.baseUrl}addrating/${id}/${rating}`,email);
  }

  getTrailor(id:number) {
     return new Promise((res, rej) => {
      this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US`).subscribe(data => {
        res(data);
      })
    })
  }

  
}
