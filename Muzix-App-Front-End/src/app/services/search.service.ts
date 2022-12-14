import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  URL:string = "http://localhost:8082/api/";
  

  constructor(private http:HttpClient) { }


  searchedMovie(enterSearchValue:string){
   let result =  this.http.get<any>(this.URL+'startsWith/'+ enterSearchValue);

  //  console.log(result);
   return result;
  }
}
