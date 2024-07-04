import knex from "knex";

const pool = knex(require('../../knexfile'));

interface Category {
    categoryID: number,
    name: string,
    description: string
};

export default class CategoryModel {
    async getAllCategories() {
        const categories: Category[] = await pool('categories')
                                                .select('category_id as categoryID', 'name', 'description');
        return categories;
    }
};