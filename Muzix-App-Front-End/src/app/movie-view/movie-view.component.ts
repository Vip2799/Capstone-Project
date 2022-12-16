import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscriber } from 'rxjs';
import { genre } from '../models/genre';
import { Movie } from '../models/Movie';
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

  constructor(private userservice: UserService, private movieservice: MovieService, private favService: FavouriteService, private snackBar: MatSnackBar, private http: HttpClient) { }
  isPlaylistOptionOpen: boolean = false;

  posterBaseUrl: string = "https://www.themoviedb.org/t/p/w440_and_h660_face";
  backdropBaseUrl: string = "https://www.themoviedb.org/t/p/original/"
  movie: any = {
    id:  0 ,
    title: '',
    release_date: '',
    backdrop_path: '',
    genre_ids: [],
    original_language: '',
    overview: '',
    vote_average: 0,
    poster_path: '',
    keyWords: []
  }

  favListsAcc: any = {};

  genresList: any = {};
  genres: any[] = [];

  trailerUrl: string = "";

  responseKey: any = {};
  currentGenre: genre[] = [];

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

  ngOnInit(): void {

    // setTimeout(() => {
    //   console.log(this.trailerUrl);

    // }, 3000)

    this.movieservice.getMovieById(13).then(obj => {
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
    })

  }


  playListOption() {
    this.createFavList = true;
    if (this.isPlaylistOptionOpen) {
      this.isPlaylistOptionOpen = false;
    } else {
      this.isPlaylistOptionOpen = true;
    }
  }


  email: string = "vipul@gmail.com";
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
    if (this.favListNameInput == "") {
      alert("Please type name of Favourite List")
    } else {
      this.favService.createFavList( this.favListNameInput).subscribe(data => {
        console.log(data);
        this.snackBar.open(`${this.favListNameInput} Favourite List is created `, "*_*", { duration: 2000 });
        window.location.reload();
      })
    }

  }
  // addMovieToFavList(favListName: string){
  //   this.favser.add(favListName,this.movie).subscribe(data=>{
  //     console.log(data);
  //     this.snackBar.open("Movie added to Playlist",favListName,{duration:3000});
  //   })

  // }

  selectRating(rating: any) {
    this.snackBar.open(`You rated this movie`, rating.target.value + "/5", { duration: 1000 });
    setTimeout(() => {
      this.ratingOption = false;
    }, 3000);
    // console.log(rating.target.value);
  }

  playView: boolean = true;
  playTrailor() {
    if (this.playView) {
      this.playView = false;
    }
    else {
      this.playView = true;
    }
  }

  ratingOption: boolean = false;
  ratingbtnOption() {
    if (this.ratingOption) {
      this.ratingOption = false;
    }
    else {
      this.ratingOption = true;
    }
  }
}
