import { iReviewRepository } from "src/adapters/repositories/review/iface";
import Review from "src/entities/review";
import iReviewUseCase from "./iface";
import { injectable, inject } from "inversify";
import REFS from '../../services/references'
import { iFetchMovieDb } from "src/adapters/apis/moviedb/iface";
import { iMovieUseCase } from "../movie/iface";

@injectable()
export default class ReviewUseCase implements iReviewUseCase {
    constructor(
        @inject(REFS.ReviewRepository) private reviewRepository: iReviewRepository,
        @inject(REFS.FetchTheMovieDb) private fetchTheMovieDb: iFetchMovieDb,
        @inject(REFS.MovieUseCase) private movieUseCase: iMovieUseCase,
    )  {}

    async submitReview(tmdbId: number, userName: string, rating: number): Promise<Review> {
        const review = new Review().createReview(tmdbId, userName, rating)
        console.log(review)
        const movieExist = await this.movieUseCase.getMovieByTmdbId(tmdbId);
        console.log('Teste', movieExist)
        
        if(!movieExist) {
            const movie = await this.fetchTheMovieDb.fetchMovieDb(tmdbId);
            const reviewCreated = await this.reviewRepository.create(review);
            console.log(movie)
            await this.movieUseCase.createMovie({
                title: movie.title,
                overview: movie.overview,
                poster: movie.poster,
                releaseDate: movie.releaseDate,
                tmdbId,
                reviewId: reviewCreated.id,
            });

            return review;
        }
        
        return this.reviewRepository.create(review);
    }

    async getReviewByUsername(userName: string): Promise<Review[]> {
        const review = await this.reviewRepository.selectReviewByUsername(userName);
        
        if(!review) throw new Error("We didn't find any review with that userName in database");

        return review;
    }
}