import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../models/Movie';
import { MovieService } from '../services/movie.service';
import { SearchService } from '../services/search.service';
// import { MovieServiceService } from '../Services/movie-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private movieService: MovieService, private router: Router,private searchService:SearchService) {
  }

  searchValue:string =''
  searchSection:boolean = false

 

  movies: Movie[] = []
  navigateToMovie(movieId: number) {
    this.router.navigate(["movie-view", movieId])
  }

  popularMovies: Movie[] = []
  trendingmovies: Movie[] = []
  freeMovies: Movie[] = []
  searchedMovies: Movie[] =[]

 


  ngOnInit(): void {
   // this.movies = this.movieService.currentMovieListToShow;
    this.movieService.getAllMovies().subscribe({
      next: (data: any) => {
        var arr: any = data;
        this.movies = arr;
        this.popularMovies = this.movies.filter((movie: { keyWords: string[]; }) => movie.keyWords[0] == "popular");
        this.trendingmovies = this.movies.filter((movie: { keyWords: string[]; }) => movie.keyWords[0] == "trending")
        this.freeMovies = this.movies.filter((movie: { keyWords: string[]; }) => movie.keyWords[0] == "free")
        this.searchedMovies = this.movies.filter((movie) => movie.title == this.searchValue)
      }
    })
    console.log(this.movies);
  }

  onSearchTextChanged(){
    this.searchedMovies = this.movies.filter(movie => movie.title?.match(this.searchValue))
    this.searchSection = true
    console.log(this.searchedMovies)
    // this.movieService.getAllMovies().subscribe( (data: any) =>{
    //   this.movies= data;
     
    // })
    // this.searchService.searchedMovie(this.searchValue.toLowerCase()).subscribe(
    //   (data: Movie[])=> {
    //    this.movies = data;
    //    //this.searchedMovies = data;
       
    //    //window.location.reload()
    //     console.log(data);
    //     if(this.searchValue == ''){
    //       this.searchSection = false
    //     }else{
    //       this.searchSection = true
    //     }
    //  }
    // );
  }
}
