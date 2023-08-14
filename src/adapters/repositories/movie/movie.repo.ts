import { getRepository } from "typeorm";
import Movie from "../../../entities/movie";
import { iMovieRepository } from "./iface";
import { injectable } from "inversify";

@injectable()
export default class MoviesRepository implements iMovieRepository {
    private moviesRepositories = getRepository(Movie)
    
    async createMovies(movie: Movie): Promise<Movie> {
        const movieCreated = await this.moviesRepositories.save(movie)
        return this.moviesRepositories.findOne({ where: { id: movieCreated.id }})
    }

    async selectAllMovies(): Promise<Movie[]> {
        return this.moviesRepositories.find()
    }
    
    async selectMoviesById(tmdbId: number): Promise<Movie[]> {
        return this.moviesRepositories.find({ where: { tmdbId }, relations: ['review'] })
    }

    async selectMovieById(tmdbId: number): Promise<Movie> {
        return this.moviesRepositories.findOne({ where: { tmdbId: tmdbId } })
    }
}