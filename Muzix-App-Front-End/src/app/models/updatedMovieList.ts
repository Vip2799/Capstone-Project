import { genre } from "./genre";

export type updatedMovieList = {

    id? : number;
    title? : string;
    release_date : string;
    backdrop_path : string;
    genre_ids : number[];
    original_language : string;
    overview : string;
    vote_average: number;
    poster_path: string
    keyWords : string[];
    currentGenreList : genre[];


}