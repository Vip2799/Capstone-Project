import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
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
    console.log(requestToken)
    return this.http.get(this.baseUrl + "allmovies", requestToken)
  }

  getRating(id: Int16Array, email: String) {
    return new Promise((res, rej) => {
      this.http.get(`${this.baseUrl}rating`)
    })
  }


  getTrailor(id:number) {
     return new Promise((res, rej) => {
      this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US`).subscribe(data => {
        res(data);
      })
    })
  }
}
