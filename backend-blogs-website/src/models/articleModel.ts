import knex from "knex";

const pool = knex(require('../../knexfile'));

export default class ArticleModel {
    async getAllArticles() {
        const articles = await pool
                                .select('articles.article_id', 'username as author', 'title', 'content', 'views', 'likes', 'image', 'name as category', pool.raw('JSON_AGG(articles_tags.tag_name) as tags'), 'articles.created_at')
                                .from('articles')
                                .leftJoin('users', 'articles.user_id', 'users.user_id')
                                .leftJoin('categories', 'articles.category_id', 'categories.category_id')
                                .leftJoin('articles_tags', 'articles.article_id', 'articles_tags.article_id')
                                .groupBy('articles.article_id', 'username', 'title', 'content', 'views', 'likes', 'image', 'articles.created_at', 'articles.updated_at', 'name')
                                .orderBy('created_at', 'desc');
        return articles;
    };

    async getArticlesByPage(offset: number) {
        const articles = await pool
                                .select('articles.article_id', 'username as author', 'title', 'content', 'views', 'likes', 'image', 'name as category', pool.raw('JSON_AGG(articles_tags.tag_name) as tags'), 'articles.created_at')
                                .from('articles')
                                .leftJoin('users', 'articles.user_id', 'users.user_id')
                                .leftJoin('categories', 'articles.category_id', 'categories.category_id')
                                .leftJoin('articles_tags', 'articles.article_id', 'articles_tags.article_id')
                                .groupBy('articles.article_id', 'username', 'title', 'content', 'views', 'likes', 'image', 'articles.created_at', 'articles.updated_at', 'name')
                                .orderBy('created_at', 'desc')
                                .limit(10)
                                .offset(offset);
        return articles;
    }

    async getTopArticles(limit: number) {
        const articles = await pool
                                .select('article_id', 'title', 'likes')
                                .from('articles')
                                .orderBy('likes', 'asc')
                                .limit(limit);
        return articles;
    }

    async getArticleByID(articleID: number) {
        await pool('articles').where('article_id', '=', articleID).increment('views', 1);
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

    async getArticlesByUsername(username: string) {
        const articles = await pool
                                .select('articles.article_id', 'username as author', 'title', 'content', 'views', 'likes', 'image', 'name as category', pool.raw('JSON_AGG(articles_tags.tag_name) as tags'), 'articles.created_at')
                                .from('articles')
                                .leftJoin('users', 'articles.user_id', 'users.user_id')
                                .leftJoin('categories', 'articles.category_id', 'categories.category_id')
                                .leftJoin('articles_tags', 'articles.article_id', 'articles_tags.article_id')
                                .groupBy('articles.article_id', 'username', 'title', 'content', 'views', 'likes', 'image', 'articles.created_at', 'articles.updated_at', 'name')
                                .having('users.username', '=', username)
                                .orderBy('created_at', 'desc');
        return articles;
    }
}