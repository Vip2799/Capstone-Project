import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscriber } from 'rxjs';
import { genre } from '../models/genre';
import { Movie } from '../models/Movie';
import { FavouriteService } from '../services/favourite.service';
import { Favourite1Service } from '../services/favourite1.service';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit {

  constructor(private userservice:UserService,private favser:FavouriteService, private movieservice:MovieService, private favService:Favourite1Service, private snackBar:MatSnackBar){}
  isPlaylistOptionOpen:boolean = false;
  
  posterBaseUrl:string = "https://www.themoviedb.org/t/p/w440_and_h660_face" ;
  backdropBaseUrl:string="https://www.themoviedb.org/t/p/original/"
  movie:any  ={
    id : 0,
    title:'Black Adam',
    release_date: '2022-10-19',
    backdrop_path: '',
    genre_ids: [35,14,878],
    original_language: '',
    overview: 'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods�and imprisoned just as quickly�Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.',
    vote_average: 0,
    poster_path: '',
    keyWords: []
  }

  favListsAcc:any= {};

  genresList:any = {};
  genres:any[]=[]

  currentGenre:genre[] = [];

  ngOnInit(): void {
    this.userservice.getGenres().then((response)=>{
      this.genresList = response ;
      this.genres = this.genresList.genres;

      for(let genre_id of this.movie.genre_ids){
        // this.currentGenre = this.genres.filter((obj) => obj.id == genre_id)
        this.genres.forEach(obj=>{
          if(obj.id == genre_id){
            this.currentGenre.push(obj);
          }
        })
      }

        console.log(this.currentGenre);
    }).catch(err=> console.log(err))

    this.movieservice.getMovieById(238).then(obj =>{
      this.movie = obj ;
    })

    this.favService.getFavListAcc().then(data=>{
      this.favListsAcc = data ;
    })

    
    // console.log(this.genres);
  }
  playListOption(){
      if(this.isPlaylistOptionOpen){
        this.isPlaylistOptionOpen = false;
      }else{
        this.isPlaylistOptionOpen = true;
      }
  }
  // addMovieToFavList(email:string,favListName: string){
  //   this.favService.addMovieToFav(email,favListName,this.movie).then(data=>{
  //     console.log(data);
  //     this.snackBar.open("Movie added to Playlist",favListName,{duration:3000});
  //   })

  // }
  addMovieToFavList(favListName: string){
    this.favser.add(favListName,this.movie).subscribe(data=>{
      console.log(data);
      this.snackBar.open("Movie added to Playlist",favListName,{duration:3000});
    })

  }
}
