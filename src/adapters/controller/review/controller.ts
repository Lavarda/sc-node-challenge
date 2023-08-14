import * as express from "express";
import { inject, injectable } from 'inversify';
import { BaseHttpController, controller, interfaces, httpPost, request, response } from 'inversify-express-utils';
import iReviewUseCase from 'src/usecases/review/iface';
import REFS from '../../../services/references'

@controller('/reviews')
export class ReviewController extends BaseHttpController implements interfaces.Controller {
    constructor(
        @inject(REFS.ReviewUseCase) private reviewUseCase: iReviewUseCase
    ) {
        super()
    }

    @httpPost('/')
    async createReview(@request() req: express.Request, @response() res: express.Response): Promise<void>{
        const { tmdbId, userName, rating } = req.body;

        try {
            const review = await this.reviewUseCase.submitReview(tmdbId, userName, rating);

            res.status(201).json(review);
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}