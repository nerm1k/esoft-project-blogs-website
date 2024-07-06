import knex from "knex";

const pool = knex(require('../../knexfile'));

interface Article {
    articleID: number,
    userID: number,
    title: string,
    content: string,
    categoryID: number,
    views: number,
    likes: number,
    image: string,
    createdAt: string,
    updatedAt: string
}

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
                                .orderBy('likes', 'desc')
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
                                .having(pool.raw('lower(username)'), '=', username)
                                .orderBy('created_at', 'desc');
        return articles;
    }

    async createArticle(userID: number, title: string, category: number, content: string, tags?: string, imageName?: string) {
        const article: Article[] = await pool('articles')
                                .insert({ user_id: userID, title: title, category_id: category, content: content, image: imageName})
                                .returning(['article_id as articleID', 'user_id as userID', 'title', 'content', 'category_id as categoryID', 'views', 'likes', 'image', 'created_at as createdAt', 'updated_at as updatedAt']);
                               
        if (tags) {
            for (let tag of tags) {
                await pool('articles_tags')
                        .insert({article_id: article[0].articleID, tag_name: tag});
            }
        }  

        return article[0];
    }

    async updateLikesByArticleID(articleID: number, userID: number) {
        const isLikeExists = await pool('articles_likes')
                                    .where('article_id', '=', articleID)
                                    .where('user_id', '=', userID)
                                    .first();
        if (isLikeExists) {
            await pool('articles_likes')
                    .where('article_id', '=', articleID)
                    .where('user_id', '=', userID)
                    .delete();

            const article: Article = await pool('articles')
                                            .where('article_id', '=', articleID)
                                            .decrement('likes', 1)
                                            .returning(['article_id as articleID', 'user_id as userID', 'title', 'content', 'category_id as categoryID', 'views', 'likes', 'image', 'created_at as createdAt', 'updated_at as updatedAt']);

            return article;
            
        } else {
            await pool('articles_likes')
                    .insert({article_id: articleID, user_id: userID});

            const article: Article = await pool('articles')
                                            .where('article_id', '=', articleID)
                                            .increment('likes', 1)
                                            .returning(['article_id as articleID', 'user_id as userID', 'title', 'content', 'category_id as categoryID', 'views', 'likes', 'image', 'created_at as createdAt', 'updated_at as updatedAt']);
            
            return article;
        }
    }

    async deleteArticleByArticleID(articleID: number) {
        await pool('articles')
                .where('article_id', '=', articleID)
                .delete();
    }
}