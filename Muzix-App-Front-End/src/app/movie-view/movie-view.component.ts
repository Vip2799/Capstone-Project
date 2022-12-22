import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { genre } from '../models/genre';
import { Movie } from '../models/Movie';
import { updatedMovieList } from '../models/updatedMovieList';
import { FavouriteService } from '../services/favourite.service';
// import { Favourite1Service } from '../services/favourite1.service';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder, private userservice: UserService, private movieservice: MovieService, private favService: FavouriteService, private snackBar: MatSnackBar, private router: Router) { }

  // ngOnChanges(changes: SimpleChanges): void {
  //     this.movieservice.getMovieById(this.paramMovieId).then(data=>{
  //       this.movie = data ;
  //       console.log(changes);
  //     })
  // }
  isPlaylistOptionOpen: boolean = false;

  ratingform = this.fb.group({
    rate: [""]
  })

  posterBaseUrl: string = "https://www.themoviedb.org/t/p/w440_and_h660_face";
  backdropBaseUrl: string = "https://www.themoviedb.org/t/p/original/"
  movie: any = {
    id: 0,
    title: '',
    release_date: '',
    backdrop_path: '',
    genre_ids: [],
    original_language: '',
    overview: '',
    vote_average: 0,
    poster_path: '',
    keyWords: [],
    rating: null
  }
  paramId: any = "";
  paramMovieId: number = 0;

  favListsAcc: any = {};

  genresList: any = {};
  genres: any[] = [];

  trailerUrl: string = "";

  responseKey: any = {};
  currentGenre: genre[] = [];

  // recommendedMovieList: updatedMovieList[] = [];

  trailerInit() {
    this.movieservice.getTrailor(this.movie.id).then((data) => {
      this.responseKey = data;
      for (let obj of this.responseKey.results) {
        if (obj.name.includes("Trailer")) {
          let key = obj.key
          this.trailerUrl = `//www.youtube.com/embed/${key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`;
          break;
        }
      }

    })
  }



  getparam() {
    return new Promise((res, rej) => {
      this.activeRoute.paramMap.subscribe(data => {
        this.paramId = data.get("id");
        this.paramMovieId = parseInt(this.paramId);
        res(data.get("id"));

      })
    })
  }

  updateMovie() {
    this.ratingform.patchValue({
      rate: ""
    })
    this.ratingOption = false;
    this.currentGenre = [];
    this.movieservice.getMovieById(this.paramMovieId).then(obj => {
      this.movie = obj;

      this.trailerInit();

      this.favService.getFavListAcc().then(data => {
        this.favListsAcc = data;
      })

      this.userservice.getGenres().then((response) => {
        this.genresList = response;
        this.genres = this.genresList.genres;

        for (let genre_id of this.movie.genre_ids) {
          // this.currentGenre = this.genres.filter((obj) => obj.id == genre_id)
          this.genres.forEach(obj => {
            if (obj.id == genre_id) {
              this.currentGenre.push(obj);
            }
          })
        }

      }).catch(err => console.log(err))

      this.movieservice.getRating(this.movie.id, localStorage.getItem("emailId")).then(data => {
        if (data) {
          this.movie.rating = data;
          this.ratingform.patchValue({
            rate: this.movie.rating.toString()
          })
          // console.log(this.ratingform.get("rate")?.value);
        }
      })
    })

  }

  ngOnInit(): void {


    this.email = localStorage.getItem("emailId");

    this.movieservice.currentMovieListToShow = this.movieservice.getUpdatedMovieList();

    this.getparam();
    
    this.updateMovie();

  }


  playListOption() {
    this.createFavList = true;
    if (this.isPlaylistOptionOpen) {
      this.isPlaylistOptionOpen = false;
    } else {
      this.isPlaylistOptionOpen = true;
    }
  }


  email: any = "";
  addMovieToFavList(favListName: string) {
    this.favService.addMovieToFav(this.email, favListName, this.movie).then(data => {
      console.log(data);
      this.snackBar.open("Movie added to Favourite list", favListName, { duration: 3000 });
    }).catch(err => {
      this.snackBar.open("Movie Already Added to Favourite list", favListName, { duration: 6000 });
    })
  }

  favListNameInput: string = "";
  createFavList: boolean = true;

  create() {
    if (this.createFavList) {
      this.createFavList = false;
    }
  }

  createPlaylist() {
    if (localStorage.getItem("emailId")) {
      if (this.favListNameInput == "") {
        alert("Please type name of Favourite List")
      } else {
        this.favService.createFavList(this.favListNameInput).subscribe(data => {
          // console.log(data);
          if (data) {
            this.snackBar.open(`${this.favListNameInput} Favourite List is created `, "*_*", { duration: 2500 });
            this.createFavList = true;
            window.location.reload();
          }
          else {
            this.snackBar.open(`${this.favListNameInput} Favourite List with name "${this.favListNameInput}" already exists`, "", { duration: 3000 });

          }
        })
      }
    }
    else {
      alert("Please Login to create Favourite List...!");
      this.router.navigate(["login"]);
    }

  }
  // addMovieToFavList(favListName: string){
  //   this.favser.add(favListName,this.movie).subscribe(data=>{
  //     console.log(data);
  //     this.snackBar.open("Movie added to Playlist",favListName,{duration:3000});
  //   })

  // }

  selectRating(rating: any) {

    this.movieservice.addRating(localStorage.getItem("emailId"), this.movie.id, rating.target.value).subscribe(data => {
      console.log(data);
      this.snackBar.open(`You rated this movie`, this.ratingform.get("rate")?.value + "/5", { duration: 1000 });
      console.log(rating.target.value);

      setTimeout(() => {
        this.ratingOption = false;
        // window.location.reload();
      }, 2000);
    })
    //vipul
    // console.log(rating.target.value);
  }

  playView: boolean = true;
  zaxis: number = -10;
  playTrailor() {
    let user: any = localStorage.getItem("emailId");
    if (user) {
      this.userservice.getProfile(user).then((data:any)=>{
        if (data.subscribedPlan) {
          if (this.playView) {
            this.playView = false;
            this.zaxis = 0;
          }
          else {
            this.playView = true;
            this.zaxis = -10;
          }
        } else {
          this.snackBar.open("Please Buy Subscription plan to watch movie", ";)", { duration: 3000 });
          this.router.navigate(["payment"]);
        }
      })
     
    } else {
      this.snackBar.open("Please Login before playing movie", ";)", { duration: 3000 });
      this.router.navigate(["login"]);

    }

  }

  ratingOption: boolean = false;
  ratingbtnOption() {
    if (localStorage.getItem("emailId")) {
      if (this.ratingOption) {
        this.ratingOption = false;
      }
      else {
        this.ratingOption = true;
      }
    }
    else {
      alert("Please Login to give rating!!")
      this.router.navigate(["login"])
    }

  }

  navigateToMovie(id: number) {
    this.router.navigate(['movie-view', id]);
    this.getparam().then(data => {
      this.updateMovie();
      // alert("hello")
      document.documentElement.scrollTop = 0;
    })
    // setTimeout(() => {
    // this.updateMovie()

    // }, 1000)
    // window.location.reload();
  }
}
