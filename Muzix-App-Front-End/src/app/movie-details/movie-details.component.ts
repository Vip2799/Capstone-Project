import { Component } from '@angular/core';
import { Movie } from '../models/Movie';
import { MovieServiceService } from '../Services/movie-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  constructor(private movieService:MovieServiceService){
    
   
  }

   movies:Movie[] = []
   
   ngOnInit(): void {
    
    this.movieService.getAllMovies().subscribe({
      
      next: data => {
         var arr:any = data;
        this.movies = arr;  
        console.log(this.movies);
        var movie = this.movies[0]     
      }
    })
  }
}
