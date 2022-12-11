package com.niit.searchService.SearchService.services;

import com.niit.searchService.SearchService.domain.Movie;
import com.niit.searchService.SearchService.exception.MovieNotFoundException;

public interface MovieService {

    public Movie searchMovieByName(String name) throws MovieNotFoundException;
}
