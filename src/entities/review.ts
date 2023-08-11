import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Movie from "./movie";

@Entity()
export default class Review {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    tmdbId: number;

    @Column()
    userName: string;

    @Column()
    rating: number;

    @OneToMany(() => Movie, (movie) => movie.review)
    movies?: Movie[]

    createReview(tmdbId, userName, rating): Review {
        const review = new Review()

        review.tmdbId = tmdbId
        review.userName = userName
        review.rating = rating

        return review;
    }
}
  