import CategoryModel from "../models/categoryModel";

export default class CategoryService {
    categoryModel: CategoryModel;

    constructor(categoryModel: CategoryModel) {
        this.categoryModel = categoryModel;
    }

    async getAllCategories() {
        const categories = await this.categoryModel.getAllCategories();
        return categories;
    }
}