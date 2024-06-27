import { Request, Response } from "express";
import FeedbackService from "../services/feedbackService";
import { HttpStatusCode } from "../utils/enums";

export default class FeedbackController {
    feedbackService: FeedbackService;

    constructor(articleService: FeedbackService) {
        this.feedbackService = articleService;
    }

    createFeedback = async (req: Request, res: Response) => {
        try {
            const {topic, description, email} = req.body;
            const feedback = await this.feedbackService.createFeedback(topic, email, description);
            res.status(HttpStatusCode.OK).json(feedback);
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }
}