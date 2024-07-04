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
                const limit = req.query.limit;
                const articles = await this.articleService.getTopArticles(+limit);
                res.status(HttpStatusCode.OK).json(articles);
            } else if (req.query.page) {
                const page = req.query.page;
                const articles = await this.articleService.getArticlesByPage(+page);
                res.status(HttpStatusCode.OK).json(articles);
            } else {
                const articles = await this.articleService.getAllArticles();
                res.status(HttpStatusCode.OK).json(articles);
            }
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message: error});
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

    getArticlesByUsername = async (req: Request, res: Response) => {
        try {
            const username = req.params.username;
            const articles = await this.articleService.getArticlesByUsername(username);
            res.status(HttpStatusCode.OK).json(articles);
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error});
        }
    }

    createArticle = async (req: Request, res: Response) => {
        try {
            const { userID, title, category, content, tags } = req.body;
            const imageName = req.file?.filename;
            const article = await this.articleService.createArticle(userID, title, category, content, tags, imageName);
            res.status(HttpStatusCode.CREATED).json(article);
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error});
        }
    }

    likeArticle = async (req: Request, res: Response) => {
        try {
            const articleID = req.params.articleID;
            const user = req.body.user;
            const article = await this.articleService.likeArticle(+articleID, user.user_id);
            res.status(HttpStatusCode.CREATED).json({ message: 'Article has been liked', article: article });
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error});
        }
    }
}