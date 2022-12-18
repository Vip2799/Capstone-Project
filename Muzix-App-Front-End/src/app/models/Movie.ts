export type Movie = {

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
    rating:rating[] ;

}

interface rating{
    email:string,
    rating:number
}