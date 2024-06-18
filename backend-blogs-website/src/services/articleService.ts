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
}