import { iReviewRepository } from "src/adapters/repositories/review/iface";
import Review from "src/entities/review";
import iReviewUseCase from "./iface";

export default class ReviewUseCase implements iReviewUseCase {
    constructor(private reviewRepository: iReviewRepository)  {}

    async submitReview(tmdbId: number, userName: string, rating: number): Promise<Review> {
        const review = new Review().createReview(tmdbId, userName, rating)
        // const review = {tmdbId, userName, rating} as Review
        return this.reviewRepository.create(review);
    }

    async getReviewByUsername(userName: string): Promise<Review[]> {
        const review = await this.reviewRepository.selectReviewByUsername(userName);
        
        if(!review) throw new Error("We didn't find any review with that userName in database");

        return review;
    }
}