import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit{

  constructor(private movieservice:MovieService){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.movieservice.currentMovieListToShow = this.movieservice.getUpdatedMovieList();
    
  }

}
