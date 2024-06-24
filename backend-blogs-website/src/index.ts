import express, { Express } from "express";
import cors from 'cors';
import knex from "knex";
import { routes } from "./routes/routes";
import ArticleModel from "./models/articleModel";
import ArticleService from "./services/articleService";
import ArticleController from "./controllers/articleController";
import FeedbackModel from "./models/feedbackModel";
import FeedbackService from "./services/feedbackService";
import FeedbackController from "./controllers/feedbackContoller";

const app: Express = express();

const articleModel: ArticleModel = new ArticleModel();
const articleService: ArticleService = new ArticleService(articleModel);
const articleController: ArticleController = new ArticleController(articleService);

const feedbackModel: FeedbackModel = new FeedbackModel();
const feedbackService: FeedbackService = new FeedbackService(feedbackModel);
const feedbackController: FeedbackController = new FeedbackController(feedbackService);

const corsOptions = {
  origin: "*",
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes(articleController, feedbackController));


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


  // const pool = knex({
  //   client: 'pg',
  //   connection: {
  //     connectionString: 'postgresql://postgres:admin@localhost:5432/blogwebsite?application_name=app',
  //     pool: {
  //       min: 2,
  //       max: 50,
  //       idleTimeoutMillis: 10000
  //     }
  //   },
  //   migrations: {
  //     directory: './migrations',
  //   }
  // })

// interface User {
//   id: number,
//   name: string
// }

// interface Category {
//   id: number,
//   name: string,
//   description: string
// }

// pool
//     .select('')
//     .from('users')
//      .then(users => {
//        console.log(users);
//      })
//      .catch(error => {
//        console.error(error); 
//      });