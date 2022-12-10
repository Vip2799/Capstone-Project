package com.niit.MovieService;

import com.niit.MovieService.services.MovieService;
import com.niit.MovieService.services.MovieServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class MovieServiceApplication {

	public static void main(String[] args) throws IOException, InterruptedException {

		SpringApplication.run(MovieServiceApplication.class, args);
	}

}
