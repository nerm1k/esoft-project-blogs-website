import express, { Router } from "express";
import ArticleController from "../controllers/articleController";

export const routes = (articleController: ArticleController): Router => {
    const router = express.Router();

    router.get('/articles', articleController.getAllArticles);

    return router;
}