import { iMovieRepository } from "src/adapters/repositories/movie/iface";
import Movie from "src/entities/movie";
import { iMovieUseCase } from "./iface";
import REFS from "../../services/references"
import { inject, injectable } from "inversify";

@injectable()
export default class MovieUseCase implements iMovieUseCase {
    constructor(
        @inject(REFS.MovieRepository) private movieRepository: iMovieRepository,
    ) {}

    async createMovie(payload: {title: string, releaseDate: string, poster: string, overview: string, tmdbId: number, reviewId: number }): Promise<Movie> {
        const movie = new Movie().createMovie(payload)
        const movieCreated = await this.movieRepository.createMovies(movie);
        
        return movieCreated;
    }

    async getMovieByTmdbId(tmdbId: number): Promise<Movie> {
        const movies = await this.movieRepository.selectMovieById(tmdbId);
        
        return movies;
    }

    async getMoviesByTmdbId(tmdbId: number): Promise<Movie[]> {
        const movies = await this.movieRepository.selectMoviesById(tmdbId);
        
        if(!movies) throw new Error('Movie not exists in database');

        return movies;
    }
}