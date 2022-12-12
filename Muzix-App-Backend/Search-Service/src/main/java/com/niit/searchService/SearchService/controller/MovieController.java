package com.niit.searchService.SearchService.controller;

import com.niit.searchService.SearchService.exception.MovieNotFoundException;
import com.niit.searchService.SearchService.services.MovieServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MovieController {

    private MovieServiceImpl movieService;

    @Autowired
    public MovieController(MovieServiceImpl movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<?> searchMovie(@PathVariable String name) throws MovieNotFoundException {

        try {
            return new ResponseEntity<>(movieService.searchMovieByName(name), HttpStatus.OK);
        }catch (MovieNotFoundException ex){
            throw new MovieNotFoundException();
        }
    }

    @GetMapping("startsWith/{name}")
    public ResponseEntity<?> searchAllStartsWith(@PathVariable String name){
        return new ResponseEntity<>(movieService.startsWithName(name),HttpStatus.OK);
    }
}
