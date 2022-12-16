import { Component } from '@angular/core';
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

  movies: any = [];

  addMovieData : any = [];

  movie : any ;

  movieName : any;

  listName: any;
  email:string = ""
  lists : any = [];

  name : any;
  isShow : boolean = true;

  favs : any ;
  moviesOfList : FavouriteList = {}; 
  genresList: any = {};
  genres: any[] = [];

  constructor(private favourite : FavouriteService, private search: SearchService, private userservice:UserService){}

  

  ngOnInit(){
    this.userservice.getGenres().then((response) => {
      this.genresList = response;
      this.genres = this.genresList.genres;
      console.log(this.genres);
      

    }).catch(err => console.log(err))

      this.favourite.getAcc().subscribe(data => {
        
        this.favs = data.favouriteLists;
    
      })
  }


  
  createList(){
    this.favourite.createFavList(this.listName).subscribe(
      data=> {
        this.name = data
      console.log(data);
    }
    )
    window.location.reload();
  }
updatedMovieList:updatedMovieList[] = [];

 view(listName:any){
    this.isShow = true;
     this.favourite.getFavListByListName(listName).subscribe(data=>
      {
        
        this.moviesOfList = data;
        console.log(this.moviesOfList)

        
        this.movies=this.moviesOfList.movieList ;

        for(let movie of this.movies){
          let currentGenre: any[] = [];
          for (let genre_id of movie.genre_ids) {
            // this.currentGenre = this.genres.filter((obj) => obj.id == genre_id)
            this.genres.forEach(obj => {
              if (obj.id == genre_id) {
                currentGenre.push(obj);
              }
            })
          }
          movie.currentGenreList = currentGenre ;
          
          this.updatedMovieList.push(movie);
        }
        // console.log(this.updatedMovieList[0]);
  
    })

      
 }


delete(listName:any,id:any){

  // window.location.reload();
  this.isShow = true;
  this.favourite.deleteMovieFromList(listName,id).subscribe(data1 =>
    
        {this.favourite.getFavListByListName(listName).subscribe(data=>
          {this.movies=data.movieList,
            data1 = data;
          console.log(data);
      })
         })
      }
}
