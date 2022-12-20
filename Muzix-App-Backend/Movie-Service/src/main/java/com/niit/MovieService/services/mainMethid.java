package com.niit.MovieService.services;

import com.niit.MovieService.domain.Movie;
import com.niit.MovieService.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

public class mainMethid {
    public static void main(String[] args) throws IOException, InterruptedException {
//        String url = "https://api.themoviedb.org/3/movie/top_rated?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1";
////        String url = "https://api.themoviedb.org/3/movie/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1";
////        String url = "https://api.themoviedb.org/3/movie/upcoming?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1";
//        HttpRequest request = HttpRequest.newBuilder().GET().uri(URI.create(url)).build();
//        HttpClient client = HttpClient.newBuilder().build();
//        MovieService m = new MovieServiceImpl();
//        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
//        System.out.println(response.body());

        Map<String, Integer> rating = new HashMap<>();
        rating.put("vipul@gmail.com",5);
        rating.put("arjun@gmail.com",7);
        System.out.println(rating.get("vipul23@gmail.com"));
//
//        MovieService movieService = new MovieServiceImpl();
//        movieService.addRating(238,"vipul99gmail.com",5);
//        movi

    }
}
