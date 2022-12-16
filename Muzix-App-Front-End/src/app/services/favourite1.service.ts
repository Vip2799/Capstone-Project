// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Movie } from '../models/Movie';

// @Injectable({
//   providedIn: 'root'
// })
// export class Favourite1Service {

//   URL:string = "http://localhost:8081/favourite/";


//   constructor( private http:HttpClient) { }

//   getFavListByName2(listName:any){
//     return new Promise((res,rej)=>{
//       this.http.get(this.URL+'favList/get/vipul@gmail.com/'+listName).subscribe(data=>{
//         res(data);
//       })
//     });
//   }

//   // getMovieList(obj:any){
//   //   let resp =  this.http.get<any>("http://localhost:8081/favourite/favList/get/vipul@gmail.com/bollywood");
//   //   resp.subscribe(data=>{
//   //     console.log(data);
//   //   })
//   // }

//   getFavListAcc(){
//     return new Promise((res,rej)=>{
//       this.http.get<any>(this.URL+'getAccount/vipul@gmail.com').subscribe(data=>{
//         res(data);
//       })
//     })
//   }

  

//   createFavList(email:string,favListName:string){
//     return this.http.post(`http://localhost:8081/favourite/favList/${email}`,favListName)
//   }

//   // addMovieToFav2(email:string, listName:string,movie:Movie){
//   //   let result = this.http.post("http://localhost:8081/favourite/favList/addMovie/vipul@gmail.com/hello",movie);
//   //   console.log("inside post");
//   //   console.log(result);
//   //   return result;
//   // }
// }
