package com.niit.MovieService.controller;

import com.niit.MovieService.domain.Movie;
import com.niit.MovieService.exceptions.MovieAlreadyExistsException;
import com.niit.MovieService.exceptions.MovieNotFoundException;
import com.niit.MovieService.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.List;
@RestController
@RequestMapping("/movie/")
public class MovieController {
    @Autowired
    private MovieService movieService;

    @PostMapping("addpopularmovies")
    public ResponseEntity<?> loadAllMovies(@RequestBody List<Movie> movieList){
        try {
            return new ResponseEntity<>(movieService.loadPopularMovies(movieList), HttpStatus.CREATED);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("addfreemovies")
    public ResponseEntity<?> loadFreeMovies(@RequestBody List<Movie> movieList){
        return new ResponseEntity<>(movieService.loadFreeMovies(movieList),HttpStatus.CREATED);
    }
    @PostMapping("addtrendingmovies")
    public ResponseEntity<?> loadTrendingMovies(@RequestBody List<Movie> movieList){
        return new ResponseEntity<>(movieService.loadTrendingMovies(movieList),HttpStatus.CREATED);
    }

    @PostMapping("addmovie")
    public ResponseEntity<?> addMovie(@RequestBody Movie movie){
        try {
            return new ResponseEntity<>(movieService.addMovie(movie), HttpStatus.CREATED);
        } catch (MovieAlreadyExistsException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable int id){
        try {
            return new ResponseEntity<>(movieService.deleteMovie(id),HttpStatus.ACCEPTED);
        } catch (MovieNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("updateMovieList")
    public ResponseEntity<?> updateMovieList(@RequestBody List<Movie> movieList){
        return new ResponseEntity<>(movieService.updateMovieList(movieList),HttpStatus.CREATED);
    }

    @DeleteMapping("deleteAll")
    public ResponseEntity<?> deleteAllMovies(){
        return new ResponseEntity<>(movieService.deleteAllMovies(),HttpStatus.ACCEPTED);
    }

    @GetMapping("allmovies")
    public ResponseEntity<?> getAllMovies(){
        return new ResponseEntity<>(movieService.getAllMovies(),HttpStatus.OK);
    }

}
