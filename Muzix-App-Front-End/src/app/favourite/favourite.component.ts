import { Component } from '@angular/core';
import { Favourite } from 'src/models/favourite';
import { Movie } from 'src/models/movie';
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

  favs : any ;

  constructor(private favourite : FavouriteService, private search: SearchService){}

  ngOnInit(){
  
    // this.favourite.get(this.listName).subscribe(data1=>{this.movies=data1,
    //   console.log(data1);})

      this.favourite.getAcc().subscribe(data => {
        
        this.lists = data[0];
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

}
