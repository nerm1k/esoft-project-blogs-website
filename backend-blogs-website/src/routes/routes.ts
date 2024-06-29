import express, { Router } from "express";
import ArticleController from "../controllers/articleController";
import FeedbackController from "../controllers/feedbackContoller";
import UserController from "../controllers/userController";

export const routes = (articleController: ArticleController, feedbackController: FeedbackController, userController: UserController): Router => {
    const router = express.Router();

    router.post('/api/v1/register', userController.registerUser);
    router.post('/api/v1/login', userController.loginUser);

    router.get('/api/v1/articles', articleController.getAllArticles);
    router.get('/api/v1/articles/:id', articleController.getArticleByID);

    router.post('/api/v1/feedbacks', feedbackController.createFeedback);

    return router;
}