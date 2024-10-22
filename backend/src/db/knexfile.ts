import type { Knex } from "knex";

const knexConfig: { [key: string]: Knex.Config } = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  }
}

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // }


export default knexConfig;
