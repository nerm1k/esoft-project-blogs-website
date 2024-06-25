import knex from "knex";

const pool = knex(require('../../knexfile'));

export default class ArticleModel {
    async getAllArticles() {
        const articles = await pool
                                .select('articles.article_id', 'username as author', 'title', 'content', 'views', 'likes', 'image', 'name as category', pool.raw('JSON_AGG(articles_tags.tag_name) as tags'), 'articles.created_at', 'articles.updated_at')
                                .from('articles')
                                .leftJoin('users', 'articles.user_id', 'users.user_id')
                                .leftJoin('categories', 'articles.category_id', 'categories.category_id')
                                .leftJoin('articles_tags', 'articles.article_id', 'articles_tags.article_id')
                                .groupBy('articles.article_id', 'username', 'title', 'content', 'views', 'likes', 'image', 'articles.created_at', 'articles.updated_at', 'name');
        return articles;
    };

    async getArticleByID(articleID: number) {
        const article = await pool
                                .select('articles.article_id', 'username as author', 'title', 'content', 'views', 'likes', 'image', 'name as category', pool.raw('JSON_AGG(articles_tags.tag_name) as tags'), 'articles.created_at', 'articles.updated_at')
                                .from('articles')
                                .leftJoin('users', 'articles.user_id', 'users.user_id')
                                .leftJoin('categories', 'articles.category_id', 'categories.category_id')
                                .leftJoin('articles_tags', 'articles.article_id', 'articles_tags.article_id')
                                .groupBy('articles.article_id', 'username', 'title', 'content', 'views', 'likes', 'image', 'articles.created_at', 'articles.updated_at', 'name')
                                .having('articles.article_id', '=', articleID);
        return article[0];
    }
}