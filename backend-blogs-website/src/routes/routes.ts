import express, { Router } from "express";
import ArticleController from "../controllers/articleController";
import FeedbackController from "../controllers/feedbackContoller";

export const routes = (articleController: ArticleController, feedbackController: FeedbackController): Router => {
    const router = express.Router();

    router.get('/api/v1/articles', articleController.getAllArticles);
    router.get('/api/v1/articles/:id', articleController.getArticleByID);

    router.post('/api/v1/feedbacks', feedbackController.createFeedback);

    return router;
}