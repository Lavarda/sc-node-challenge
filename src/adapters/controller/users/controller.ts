import * as express from "express";
import { inject, injectable } from 'inversify';
import { BaseHttpController, controller, interfaces, httpGet, requestParam, response } from 'inversify-express-utils';
import iReviewUseCase from 'src/usecases/review/iface';
import REFS from '../../../services/references'

@controller('/users')
export class UserController extends BaseHttpController implements interfaces.Controller {
    constructor(
        @inject(REFS.ReviewUseCase) private reviewUseCase: iReviewUseCase
    ) {
        super()
    }

    @httpGet('/:userName/reviews')
    async getReviews (@requestParam("userName") userName: string, @response() res: express.Response): Promise<void>{
        try {
            const reviews = await this.reviewUseCase.getReviewByUsername(userName);

            res.status(201).json(reviews);
        } catch (err) {
            throw new Error(err)
        }
    }
}