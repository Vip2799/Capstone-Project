package com.niit.MovieService.services;

import com.niit.MovieService.domain.Movie;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class mainMethid {
    public static void main(String[] args) throws IOException, InterruptedException {
        String url = "https://api.themoviedb.org/3/tv/top_rated?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1";
        HttpRequest request = HttpRequest.newBuilder().GET().uri(URI.create(url)).build();
        HttpClient client = HttpClient.newBuilder().build();
        MovieService m = new MovieServiceImpl();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}
