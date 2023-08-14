import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import Review from "./review";

@Entity()
export default class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int4' })
    tmdbId: number;

    @Column()
    title: string;

    @Column()
    releaseDate: string;

    @Column()
    poster: string;

    @Column()
    overview: string;

    @Column({ type: 'int4', nullable: true })
    reviewId?: number;

    @ManyToOne(() => Review, (review) => review.movies)
    @JoinColumn({ name: 'reviewId', referencedColumnName: 'id' })
    review?: Review[];

    createMovie(payload: { tmdbId, title, releaseDate, poster, overview, reviewId }): Movie {
        const movie = new Movie()

        movie.tmdbId = payload.tmdbId
        movie.overview = payload.overview
        movie.poster = payload.poster
        movie.title = payload.title
        movie.releaseDate = payload.releaseDate
        movie.reviewId = payload.reviewId

        return movie;
    }
}