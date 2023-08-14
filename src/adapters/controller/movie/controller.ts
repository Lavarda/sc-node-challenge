import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseHttpController, controller, httpPost, httpGet, interfaces, request, requestParam, response } from 'inversify-express-utils';
import REFS from '../../../services/references'
import { iMovieUseCase } from 'src/usecases/movie/iface';

@controller('/movies')
export default class MovieController extends BaseHttpController implements interfaces.Controller {
    constructor(
        @inject(REFS.MovieUseCase) private movieUseCase: iMovieUseCase
    ) {
        super()
    }

    @httpPost('/')
    async createMovie(@request() req: Request, @response() res: Response) {
        const { title, releaseDate, poster, overview, tmdbId } = req.body;

        try {
            const movie = await this.movieUseCase.createMovie({ title, releaseDate, poster, overview, tmdbId });

            res.status(201).json(movie);
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
    @httpGet('/:tmdbId/reviews')
    async getMovieByTmdbId(@requestParam("tmdbId") tmdbId: number, @response() res: Response) {
        try {
            const movies = await this.movieUseCase.getMoviesByTmdbId(tmdbId);

            if (movies.length < 1) {
                res.status(404).json({ message: 'Movie not found'})
            }

            res.status(201).json(movies);
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}