package com.niit.FavouriteListService.controller;

import com.niit.FavouriteListService.exception.MovieAlreadyExistsException;
import com.niit.FavouriteListService.services.FavouriteService;
import com.niit.MovieService.domain.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/favourite/")
public class FavouriteServiceController {

    @Autowired
    private FavouriteService favouriteService;

    @PostMapping("favAcc/{email}")
    public ResponseEntity<?> createFavAccount(@PathVariable String email){

        return new ResponseEntity<>(favouriteService.createFavouriteAccount(email), HttpStatus.CREATED);
    }

    @GetMapping("getAccount/{email}")
    public ResponseEntity<?> getFavAccount(@PathVariable String email){
        return new ResponseEntity<>(favouriteService.getFavAccountByEmail(email),HttpStatus.FOUND);
    }

    @PostMapping("favList/{email}/{name}")
    public ResponseEntity<?> createFavList(@PathVariable String email, @PathVariable("name") String favListName){
        return new ResponseEntity<>(favouriteService.addFavouriteList(email,favListName),HttpStatus.CREATED);
    }

    @PostMapping("favList/addMovie/{email}/{name}")
    public ResponseEntity<?> addMovieToFavList(@PathVariable String email, @PathVariable String name, @RequestBody Movie movie){
        ResponseEntity responseEntity = null;
        try{
            responseEntity = new ResponseEntity(favouriteService.addMovieToFavList(email,name,movie),HttpStatus.CREATED);
        } catch (MovieAlreadyExistsException e) {
            responseEntity = new ResponseEntity(null,HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

    @DeleteMapping("favList/delete/{email}/{name}")
    public ResponseEntity<?> deleteFavListByName(@PathVariable String email, @PathVariable String name){
        return new ResponseEntity<>(favouriteService.deleteFavListByName(email,name),HttpStatus.ACCEPTED);
    }

    @DeleteMapping("favLists/deleteAll")
    public ResponseEntity<?> deleteAllFavList(){
        return new ResponseEntity<>(favouriteService.deleteAllFavList(),HttpStatus.ACCEPTED);
    }

    @DeleteMapping("favList/deleteMovie/{email}/{name}/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable String email, @PathVariable String name, @PathVariable("id") int movieId){
        return new ResponseEntity<>(favouriteService.deleteMovieFromFavList(email,name,movieId),HttpStatus.ACCEPTED);
    }


}
