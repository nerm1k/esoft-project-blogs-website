import express, { Express } from "express";
import cors from 'cors';
import "dotenv/config.js";
import knex from "knex";
import { routes } from "./routes/routes";
import ArticleModel from "./models/articleModel";
import ArticleService from "./services/articleService";
import ArticleController from "./controllers/articleController";
import FeedbackModel from "./models/feedbackModel";
import FeedbackService from "./services/feedbackService";
import FeedbackController from "./controllers/feedbackContoller";
import UserModel from "./models/userModel";
import UserService from "./services/userService";
import UserController from "./controllers/userController";
import CommentModel from "./models/commentModel";
import CommentService from "./services/commentService";
import CommentController from "./controllers/commentController";
import CategoryModel from "./models/categoryModel";
import CategoryService from "./services/categoryService";
import CategoryController from "./controllers/categoryController";
import bodyParser from "body-parser";

// const multer = require('multer');
// export const upload = multer({ dest: '../frontend-blogs-website/public/images/'});

const app: Express = express();

const articleModel: ArticleModel = new ArticleModel();
const articleService: ArticleService = new ArticleService(articleModel);
const articleController: ArticleController = new ArticleController(articleService);

const feedbackModel: FeedbackModel = new FeedbackModel();
const feedbackService: FeedbackService = new FeedbackService(feedbackModel);
const feedbackController: FeedbackController = new FeedbackController(feedbackService);

const userModel: UserModel = new UserModel();
const userService: UserService = new UserService(userModel);
const userController: UserController = new UserController(userService);

const commentModel: CommentModel = new CommentModel();
const commentService: CommentService = new CommentService(commentModel);
const commentController: CommentController = new CommentController(commentService);

const categoryModel: CategoryModel = new CategoryModel();
const categoryService: CategoryService = new CategoryService(categoryModel);
const categoryController: CategoryController = new CategoryController(categoryService);


const corsOptions = {
  origin: "*",
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes(articleController, feedbackController, userController, commentController, categoryController));
// app.use(multer({dest: 'public/images/'}).single('image'));


const port = process.env.PORT || 4200;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://46.148.229.218:${port}`);
});