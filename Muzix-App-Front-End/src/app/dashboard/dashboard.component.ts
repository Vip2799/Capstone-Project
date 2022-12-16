import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../models/Movie';
import { MovieService } from '../services/movie.service';
// import { MovieServiceService } from '../Services/movie-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private movieService: MovieService, private route: Router) {


  }

  movies: Movie[] = []
  routeToView(id: any) {
    alert("hello")
    this.route.navigate(['movie-view', id])
  }

  popularMovies: Movie[] = []
  trendingmovies: Movie[] = []
  freeMovies: Movie[] = []



  ngOnInit(): void {

    this.movieService.getAllMovies().subscribe({
      next: data => {
        var arr: any = data;
        this.movies = arr;
        this.popularMovies = this.movies.filter(movie => movie.keyWords[0] == "popular");
        this.trendingmovies = this.movies.filter(movie => movie.keyWords[0] == "trending")
        this.freeMovies = this.movies.filter(movie => movie.keyWords[0] == "free")

      }
    })
    console.log(this.movies);

  }


}
