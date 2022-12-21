import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  constructor(private movieservice: MovieService, private router: Router, private activatedRouter: ActivatedRoute) { }

  posterBaseUrl: string = "https://www.themoviedb.org/t/p/w440_and_h660_face";

  allMovies: any = [];
  paramMovieId: number = 0
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.allMovies = this.movieservice.currentMovieListToShow;
  }

  // getparam() {
  //   return new Promise((res, rej) => {
  //     this.activatedRouter.paramMap.subscribe(data => {
  //       let paramId:any = 0 ;
  //       paramId = data.get("id");
  //       paramId = data.get("id");
  //       this.paramMovieId = parseInt(paramId);
  //       res(data.get("id"));

  //     })
  //   })
  // }

  @Output()
  parentMethod: EventEmitter<any> = new EventEmitter();

  navigateToMovie(id: number) {
    this.router.navigate(["movie-view", id]).then(()=>{
      document.documentElement.scrollTop = 0 ;
    })
   
    this.parentMethod.emit(id);
  }


}
