import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  

  enterSearchValue : string = '';
  movies: any = [];

constructor(private searchService: SearchService, private router : Router){}

ngOnInit(){
  
}
searchSection:boolean = false


navigateToMovie(id:any){
  this.router.navigate(["movie-view",id]);
}
hidecont(){
  if(this.searchSection){
    this.searchSection = false;
  }else{
    this.searchSection = true ;
  }
}

onSearchTextChanged(){
  if(this.enterSearchValue == ""){
    this.movies = [];
    this.searchSection = false;
  }
 this.searchService.searchedMovie(this.enterSearchValue).subscribe(

   (  data: any)=> {
    this.searchSection = true ;
    this.movies = data;
   
    // console.log(data);
  }

 );
 

}
}
