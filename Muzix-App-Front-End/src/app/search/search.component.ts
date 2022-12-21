import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  

  enterSearchValue : string = '';
  movies: any = [];

constructor(private searchService: SearchService){}

ngOnInit(){
  
}

onSearchTextChanged(){
 this.searchService.searchedMovie(this.enterSearchValue).subscribe(

  data=> {
  
    this.movies = data;
    
    // console.log(data);
  }

 );
 
}
}
