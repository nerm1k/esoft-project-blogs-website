import { Request, Response } from "express";
import ArticleService from "../services/articleService";
import { HttpStatusCode } from "../utils/enums";

export default class ArticleController {
    articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    getAllArticles = async (req: Request, res: Response) => {
        try {
            const articles = await this.articleService.getAllArticles();
            res.status(HttpStatusCode.OK).json(articles);
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }
}