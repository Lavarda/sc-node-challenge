import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseHttpController, controller, httpPost, interfaces, request, response } from 'inversify-express-utils';
import REFS from '../../../services/references'
import { iMovieUseCase } from 'src/usecases/movie/iface';

@controller('/movies')
@injectable()
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
}