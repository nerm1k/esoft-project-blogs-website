import express, { Router } from "express";
import ArticleController from "../controllers/articleController";
import FeedbackController from "../controllers/feedbackContoller";
import UserController from "../controllers/userController";
import CommentController from "../controllers/commentController";
import { authenticateJWT } from "../middleware/auth";

export const routes = (articleController: ArticleController, feedbackController: FeedbackController, userController: UserController, commentController: CommentController): Router => {
    const router = express.Router();

    router.post('/api/v1/register', userController.registerUser);
    router.post('/api/v1/login', userController.loginUser);
    router.get('/api/v1/logout', userController.logout);
    router.get('/api/v1/users/:username', userController.getUserByUsername);

    router.get('/api/v1/articles', articleController.getAllArticles);
    router.get('/api/v1/articles/:id', articleController.getArticleByID);
    router.get('/api/v1/users/:username/articles', articleController.getArticlesByUsername);

    router.get('/api/v1/articles/:id/comments', commentController.getCommentsByArticleID);
    router.post('/api/v1/articles/:id/comments', authenticateJWT, commentController.addComment);
    router.post('/api/v1/articles/:articleID/comments/:commentID/likes', authenticateJWT, commentController.likeComment);

    router.post('/api/v1/feedbacks', feedbackController.createFeedback);

    return router;
}