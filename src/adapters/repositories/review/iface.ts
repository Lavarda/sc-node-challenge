import Review from "src/entities/review";

export interface iReviewRepository {
    create: (review: Review) => Promise<Review>;
    selectReviewByUsername(userName: string): Promise<Review[]>;
}