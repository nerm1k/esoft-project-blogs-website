import CategoryService from "../services/categoryService";
import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/enums";

export default class CategoryController {
    categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
    }

    getAllCategories = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(HttpStatusCode.OK).json(categories);
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }
}