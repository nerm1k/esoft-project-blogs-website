import knex from "knex";

const pool = knex(require('../../knexfile'));

export default class ArticleModel {
    async getAllArticles() {
        const articles = await pool.select('').from('articles');
        return articles;
    }
}