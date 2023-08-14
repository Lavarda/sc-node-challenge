import 'reflect-metadata'
import container from './container'
import REFS from './references'
import iReviewUseCase from 'src/usecases/review/iface'
import { iReviewRepository } from 'src/adapters/repositories/review/iface'
import { ReviewRepository } from 'src/adapters/repositories/review/review.repo'
import ReviewUseCase from 'src/usecases/review/review.usecase'
import { iMovieRepository } from 'src/adapters/repositories/movie/iface';
import MoviesRepository from 'src/adapters/repositories/movie/movie.repo';
import { iMovieUseCase } from 'src/usecases/movie/iface';
import MovieUseCase from 'src/usecases/movie/movie.usecase';
import { iFetchMovieDb } from 'src/adapters/apis/moviedb/iface';
import { FetchTheMovieDb } from 'src/adapters/apis/moviedb/fetch.moviedb';

container.bind<iReviewRepository>(REFS.ReviewRepository).to(ReviewRepository)
container.bind<iReviewUseCase>(REFS.ReviewUseCase).to(ReviewUseCase)

container.bind<iMovieRepository>(REFS.MovieRepository).to(MoviesRepository)
container.bind<iMovieUseCase>(REFS.MovieUseCase).to(MovieUseCase)

container.bind<iFetchMovieDb>(REFS.FetchTheMovieDb).to(FetchTheMovieDb)

export default container;