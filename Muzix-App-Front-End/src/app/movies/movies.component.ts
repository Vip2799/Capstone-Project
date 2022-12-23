import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  genreShow: boolean = false;
  languageShow: boolean = false;
  filterOptionShow: boolean = false;
  filterOption() {
    if (this.filterOptionShow) {
      this.filterOptionShow = false;
      this.genreShow = false;
      this.languageShow = false;
    }
    else {
      this.filterOptionShow = true;
    }
  }

  constructor(private movieservice: MovieService, private fb: FormBuilder) { }

  filter = this.fb.group({
    value1: [null],
    value2: [null],
    value3: [null],
    value4: [null],
    value5: [null],
    value6: [null],
    value7: [null],
    value8: [null],
    value9: [null],
    value10: [null],
    value11: [null],
    value12: [null],

  })

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.movieservice.currentMovieListToShow = this.movieservice.getUpdatedMovieList();

  }

  openlanList() {
    this.genreShow = false;
    if (this.languageShow) {
      this.languageShow = false;
    }
    else {
      this.languageShow = true;
    }
  }

  opengenreList() {
    this.languageShow = false;
    if (this.genreShow) {
      this.genreShow = false;
    }
    else {
      this.genreShow = true;
    }
  }
  notification:any= "";
  result: any[] = [];
  onSubmit() {
    this.filterOption();
    let genre: string[] = ["Action", "Animation", "Comedy", "Romance", "Thriller", "Drama"]
    let language: string[] = ["en", "hi", "fr", "is", "it", "pl"];
    let selectedgenre: string[] = [];
    let selectedlanguage: string[] = [];
    for (let i = 1; i <= genre.length; i++) {
      if (this.filter.get(`value${i}`)?.value) {
        selectedgenre.push(genre[i - 1]);
      }
      if (this.filter.get(`value${i + 6}`)?.value) {
        selectedlanguage.push(language[i - 1]);
      }
    }
    this.result = [];
    let allmovies: any[] = this.movieservice.getUpdatedMovieList();
    setTimeout(() => {
      for (let movie of allmovies) {
        for (let genre of selectedgenre) {
          for (let genreName of movie.currentGenreList) {
            if (genreName.name == genre) {
              this.result.push(movie);
              break;
            }
          }

        }
        if (!this.result.includes(movie)) {
          if (selectedlanguage.includes(movie.original_language)) {
            this.result.push(movie);
          }
        }

      }
      if(selectedgenre.length > 0 || selectedlanguage.length > 0){
        this.notification = this.result.length.toString();
      }else{
        this.result = this.movieservice.currentMovieListToShow;
        this.notification = "";
      }
      


    }, 1000)
  }

}
