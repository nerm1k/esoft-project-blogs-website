import express, { Express, Request, Response } from "express";
import knex from "knex";

// const app: Express = express();
// const port = process.env.PORT || 3000;

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });


  const pool = knex({
    client: 'pg',
    connection: {
      connectionString: 'postgresql://postgres:admin@localhost:5432/blogwebsite?application_name=app',
      pool: {
        min: 2,
        max: 50,
        idleTimeoutMillis: 10000
      }
    },
    migrations: {
      directory: './migrations',
    }
  })

// interface User {
//   id: number,
//   name: string
// }

// interface Category {
//   id: number,
//   name: string,
//   description: string
// }

pool
    .select('')
    .from('users')
     .then(users => {
       console.log(users);
     })
     .catch(error => {
       console.error(error); 
     });