import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouriteList } from '../models/favourite';
import { updatedMovieList } from '../models/updatedMovieList';
import { FavouriteService } from '../services/favourite.service';
import { SearchService } from '../services/search.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {

  isPlaylistOptionOpen: boolean = false;
  movies: any = [];

  addMovieData: any = [];

  movie: any;

  movieName: any;

  listName: any ="";
  email: any = ""
  lists: any = [];

  name: any;
  isShow: boolean = true;

  favs: any;
  moviesOfList: FavouriteList = {};
  genresList: any = {};
  genres: any[] = [];

  constructor(private favourite: FavouriteService, private search: SearchService, private userservice: UserService, private snackBar: MatSnackBar) { }

  favListShow: boolean = true;

  ngOnInit() {

    this.email = localStorage.getItem("emailId");

    this.userservice.getGenres().then((response) => {
      this.genresList = response;
      this.genres = this.genresList.genres;
      // console.log(this.genres);


    }).catch(err => console.log(err))

    this.favourite.getAcc().subscribe(data => {

      this.favs = data.favouriteLists;
      if (this.favs.length == 0) {
        this.favListShow = false;
      }
      if (this.updatedMovieList.length == 0) {
        this.isShow = false;
      }
      console.log(this.favs.length);
    })

  }



  createList() {
    if (this.listName == "") {
      alert("Please type name of Favourite List")
    }
    else {
      this.isShow = true;
      this.favourite.createFavList(this.listName).subscribe(
        data => {
          // this.name = data
          console.log(data);
          this.snackBar.open(`${this.listName} Favourite List is created `, "*_*", { duration: 2000 });
          window.location.reload();
        }
      )

    }
  }
  updatedMovieList: updatedMovieList[] = [];

  movieListShow: boolean = true;

  view(listName: any) {

    this.favListShow = true;

    this.favourite.getFavListByListName(listName).subscribe(data => {

      this.moviesOfList = data;

      console.log(this.moviesOfList)


      this.movies = this.moviesOfList.movieList;

      for (let movie of this.movies) {
        let currentGenre: any[] = [];
        for (let genre_id of movie.genre_ids) {
          // this.currentGenre = this.genres.filter((obj) => obj.id == genre_id)
          this.genres.forEach(obj => {
            if (obj.id == genre_id) {
              currentGenre.push(obj);
            }
          })
        }
        movie.currentGenreList = currentGenre;

        this.updatedMovieList.push(movie);
      }
      // console.log(this.updatedMovieList[0]);
      if (this.updatedMovieList.length == 0) {
        this.movieListShow = true;
      }else{
        this.movieListShow = false ;
        window.location.reload();
      }

    })

  }



  delete(listName: any, id: any) {

    this.isShow = true;
    this.favourite.deleteMovieFromList(listName, id).subscribe(data1 => {
      this.favourite.getFavListByListName(listName).subscribe(data => {
        this.movies = data.movieList,
        data1 = data;
        console.log(data);
      })
  
    })
    

  }

  deleteFavList(listName: any) {
    this.favourite.deleteFavList(listName).subscribe(data1 => {
      this.favourite.getFavListByListName(listName).subscribe(data => {
        this.favs = data;
        console.log(data);
      })
      window.location.reload();
    })
  }

  createFavList: boolean = true;

  playListOption() {
    this.createFavList = true;
    if (this.isPlaylistOptionOpen) {
      this.isPlaylistOptionOpen = false;
    } else {
      this.isPlaylistOptionOpen = true;
    }
  }
  create() {

    if (this.createFavList) {
      this.createFavList = false;
    }

  }

  // email:any = localStorage.getItem("emailId");
  addMovie(listName: any, movieName: any) {

    this.favourite.getFavListByListName(listName).subscribe(data => {
      this.search.searchedMovie(movieName).subscribe(data =>
        
        this.favourite.addMovieToFav(this.email,listName, data[0]).then(

          data1 => {
            this.addMovieData = data1;
            console.log(data1);
          }
        ))
    })

  }

}
