import Movie from "src/entities/movie"

export interface iMovieRepository {
    createMovies(movies: Movie): Promise<Movie>;
    selectAllMovies(): Promise<Movie[]>;
    selectMoviesById(tmdbId: number): Promise<Movie[]>;
    selectMovieById(tmdbId: number): Promise<Movie>;
}