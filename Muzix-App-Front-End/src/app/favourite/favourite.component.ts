import { Component } from '@angular/core';
import { FavouriteService } from '../services/favourite.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {

  movies: any = [];

  movie : any ;

  movieName : any;

  listName: any;

  lists : any = [];

  name : any;
  isShow : boolean = true;

  favs : any ;

  constructor(private favourite : FavouriteService, private search: SearchService){}

  

  ngOnInit(){
  

      this.favourite.getAcc().subscribe(data => {
        
        this.favs = data.favouriteLists;
    
      })
  }


  addMovie(){

   
    console.log(this.movie);
    this.search.searchedMovie(this.movieName).subscribe(data=>

    this.favourite.add(this.listName,data[0]).subscribe(

      data1 => {
         this.movies = data1;
      console.log(data1);
    }

    ))

  }

  createList(){
    this.favourite.create(this.listName).subscribe(
      data=> {
        this.name = data
      console.log(data);
    }
    )
  }

 view(listName:any){
    this.isShow = true;
     this.favourite.get(listName).subscribe(data=>
      {this.movies=data.movieList,
      console.log(data);})
 }

hide(){
  this.isShow = false;
}

delete(id:any){

  window.location.reload();
 
  this.favourite.deleteMovieFromList(id).subscribe(data1 =>
    
        {this.favourite.get(this.listName).subscribe(data=>
          {this.movies=data.movieList,
            data1 = data;
          console.log(data);
      })
         })
      }
}
