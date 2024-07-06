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
        const offset = page * 10 - 10;
        const articles = await this.articleModel.getArticlesByPage(offset);
        return articles;
    }

    async getArticleByID(articleID: number) {
        const article = await this.articleModel.getArticleByID(articleID);
        return article;
    }

    async getArticlesByUsername(username: string) {
        const articles = await this.articleModel.getArticlesByUsername(username.toLocaleLowerCase());
        return articles;
    }

    async createArticle(userID: number, title: string, category: number, content: string, tags?: string, imageName?: string) {
        if (imageName) {
            imageName = '/images/' + imageName;
        }
        
        if (tags) {
            tags = JSON.parse(tags);
        }

        const article = await this.articleModel.createArticle(userID, title, category, content, tags, imageName);
        return article;
    }

    async likeArticle(articleID: number, userID: number) {
        const comment = await this.articleModel.updateLikesByArticleID(articleID, userID);
        return comment;
    }

    async deleteArticleByArticleID(articleID: number) {
        await this.articleModel.deleteArticleByArticleID(articleID);
    }
}