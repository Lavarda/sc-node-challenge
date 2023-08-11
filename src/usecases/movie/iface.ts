import Movie from "src/entities/movie";

export interface iMovieUseCase {
    createMovie(payload: {title: string, releaseDate: string, poster: string, overview: string, tmdbId: number }): Promise<Movie>;
    getMovieByTmdbId(tmdbId: number): Promise<Movie[]>;
}
