import Review from "src/entities/review";

export default interface iReviewUseCase {
    submitReview(tmdbId: number, userName: string, rating: number): Promise<Review>;
    getReviewByUsername(userName: string): Promise<Review[]>;
}