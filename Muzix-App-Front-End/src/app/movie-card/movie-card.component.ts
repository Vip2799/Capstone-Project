import { Component } from '@angular/core';
import { Movie } from '../models/Movie';
import { MovieServiceService } from '../Services/movie-service.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  constructor(private movieService:MovieServiceService){

  }

   movies:Movie[] = []
  
   

  //  ngOnInit(): void {
  //   this.movieService.getAllMovies().subscribe({
  //     next: data => {
  //       //this.movie = data;
  //        var arr:any = data;
  //       this.movies = arr;
     
  //     }
  //   })
   
  // }
  

}
