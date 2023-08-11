import { getRepository } from "typeorm";
import { iReviewRepository } from "./iface";
import Review from "src/entities/review";
import { injectable } from "inversify";

@injectable()
export class ReviewRepository implements iReviewRepository {
    private reviewRepository = getRepository(Review)
    
    async create(review: Review): Promise<Review> {
        return this.reviewRepository.save(review)
    }
    
    async selectReviewByUsername(userName: string): Promise<Review[]> {
        return this.reviewRepository.find({ where: { userName } })
    }
}
