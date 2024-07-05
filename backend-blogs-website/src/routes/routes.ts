import express, { Router } from "express";
import ArticleController from "../controllers/articleController";
import FeedbackController from "../controllers/feedbackContoller";
import UserController from "../controllers/userController";
import CommentController from "../controllers/commentController";
import { authenticateJWT } from "../middleware/auth";
import CategoryController from "../controllers/categoryController";
import { uploadImage } from "../multer";

export const routes = (articleController: ArticleController, feedbackController: FeedbackController, userController: UserController, commentController: CommentController, categoryController: CategoryController): Router => {
    const router = express.Router();

    router.post('/api/v1/register', userController.registerUser);
    router.post('/api/v1/login', userController.loginUser);
    router.get('/api/v1/logout', userController.logout);
    router.get('/api/v1/users/:username', userController.getUserByUsername);
    router.put('/api/v1/users/:userID', authenticateJWT, uploadImage, userController.updateUserByUserID);
    router.put('/api/v1/users/:userID/username', authenticateJWT, userController.updateUsernameByUserID);
    router.put('/api/v1/users/:userID/email', authenticateJWT, userController.updateEmailByUserID);
    router.put('/api/v1/users/:userID/password', authenticateJWT, userController.updatePasswordByUserID);

    router.get('/api/v1/articles', articleController.getAllArticles);
    router.get('/api/v1/articles/:id', articleController.getArticleByID);
    router.get('/api/v1/users/:username/articles', articleController.getArticlesByUsername);
    router.post('/api/v1/articles', authenticateJWT, uploadImage, articleController.createArticle);
    router.post('/api/v1/articles/:articleID/likes', authenticateJWT, articleController.likeArticle);

    router.get('/api/v1/articles/:id/comments', commentController.getCommentsByArticleID);
    router.post('/api/v1/articles/:id/comments', authenticateJWT, commentController.addComment);
    router.post('/api/v1/articles/:articleID/comments/:commentID/likes', authenticateJWT, commentController.likeComment);
    router.get('/api/v1/users/:username/comments', commentController.getCommentsByUsername);

    router.post('/api/v1/feedbacks', feedbackController.createFeedback);

    router.get('/api/v1/categories', categoryController.getAllCategories);

    return router;
}