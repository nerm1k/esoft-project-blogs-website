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
            if (req.query.limit) {
                const limit= req.query.limit;
                const articles = await this.articleService.getTopArticles(+limit);
                res.status(HttpStatusCode.OK).json(articles);
            } else {
                const articles = await this.articleService.getAllArticles();
                res.status(HttpStatusCode.OK).json(articles);
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    getArticleByID = async (req: Request, res: Response) => {
        try {
            const articleID = req.params.id;
            const article = await this.articleService.getArticleByID(+articleID);
            if (article) {
                res.status(HttpStatusCode.OK).json(article);
            } else {
                res.status(HttpStatusCode.NOT_FOUND).json(`Пост с id ${articleID} не найден.`);
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error});
        }
    }
}