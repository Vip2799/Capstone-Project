package com.niit.MovieService.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Arrays;

@Document
public class Movie {
    @Id
    private int id;
    private String name;
    private String[] origin_country;
    private String first_air_date;
    private String backdrop_path;
    private int[] genre_ids;
    private String original_language;
    private String overview;
    private double vote_average;

    private List<String> keyWords;

    public Movie() {
    }

    public Movie(int id, String name, String[] origin_country, String first_air_date, String backdrop_path, int[] genre_ids, String original_language, String overview, double vote_average, List<String> keyWords) {
        this.id = id;
        this.name = name;
        this.origin_country = origin_country;
        this.first_air_date = first_air_date;
        this.backdrop_path = backdrop_path;
        this.genre_ids = genre_ids;
        this.original_language = original_language;
        this.overview = overview;
        this.vote_average = vote_average;
        this.keyWords = keyWords;
    }

    public List<String> getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(List<String> keyWords) {
        this.keyWords = keyWords;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getOrigin_country() {
        return origin_country;
    }

    public void setOrigin_country(String[] origin_country) {
        this.origin_country = origin_country;
    }

    public String getFirst_air_date() {
        return first_air_date;
    }

    public void setFirst_air_date(String first_air_date) {
        this.first_air_date = first_air_date;
    }

    public String getBackdrop_path() {
        return backdrop_path;
    }

    public void setBackdrop_path(String backdrop_path) {
        this.backdrop_path = backdrop_path;
    }

    public int[] getGenre_ids() {
        return genre_ids;
    }

    public void setGenre_ids(int[] genre_ids) {
        this.genre_ids = genre_ids;
    }

    public String getOriginal_language() {
        return original_language;
    }

    public void setOriginal_language(String original_language) {
        this.original_language = original_language;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public double getVote_average() {
        return vote_average;
    }

    public void setVote_average(double vote_average) {
        this.vote_average = vote_average;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", origin_country=" + Arrays.toString(origin_country) +
                ", first_air_date='" + first_air_date + '\'' +
                ", backdrop_path='" + backdrop_path + '\'' +
                ", genre_ids=" + Arrays.toString(genre_ids) +
                ", original_language='" + original_language + '\'' +
                ", overview='" + overview + '\'' +
                ", vote_average=" + vote_average +
                '}';
    }
}
