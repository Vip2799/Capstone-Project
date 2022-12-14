import { Component } from '@angular/core';
import { Movie } from '../models/Movie';
import { MovieServiceService } from '../Services/movie-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private movieService:MovieServiceService){
    
   
  }

   movies:Movie[] = []

   
   popularMovies:Movie[] = []
   trendingmovies:Movie[] = []
   freeMovies:Movie[] = []

  

   ngOnInit(): void {
    
    this.movieService.getAllMovies().subscribe({
      next: data => {
         var arr:any = data;
        this.movies = arr;
        this.popularMovies = this.movies.filter(movie => movie.keyWords[0] == "popular");
        this.trendingmovies = this.movies.filter(movie => movie.keyWords[0]=="trending")
        this.freeMovies = this.movies.filter(movie => movie.keyWords[0]=="free")
        
      }
    })
    console.log(this.movies);
    
  }
}
