import ArticleModel from "../models/articleModel";

export default class ArticleService {
    articleModel: ArticleModel;

    constructor(articleModel: ArticleModel) {
        this.articleModel = articleModel;
    }

    async getAllArticles() {
        const articles = await this.articleModel.getAllArticles();
        return articles;
    }

    async getTopArticles(limit: number) {
        const articles = await this.articleModel.getTopArticles(limit);
        return articles;
    }

    async getArticlesByPage(page: number) {
        const offset = page * 10 - 9;
        const articles = await this.articleModel.getArticlesByPage(offset);
        return articles;
    }

    async getArticleByID(articleID: number) {
        const article = await this.articleModel.getArticleByID(articleID);
        return article;
    }
}