import type { Knex } from "knex";

// Update with your config settings.

// const config: { [key: string]: Knex.Config } = {
//   development: {
//     client: 'pg',
//     connection: {
//       connectionString: 'postgresql://postgres:admin@127.0.0.1:5432/blogwebsite?application_name=app',
//       pool: {
//         min: 2,
//         max: 50,
//         idleTimeoutMillis: 10000
//       }
//     },
//     migrations: {
//       directory: './migrations',
//       tableName: 'migrations'
//     },
//     seeds: {
//       directory: './seeds'
//     }
//   },
// };

const config = {
    client: 'pg',
    connection: {
      connectionString: 'postgresql://postgres:admin@127.0.0.1:5432/blogwebsite?application_name=app',
      pool: {
        min: 2,
        max: 50,
        idleTimeoutMillis: 10000
      }
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './seeds'
    }
};

module.exports = config;
