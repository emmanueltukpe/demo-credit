import Knex from "knex";
import { env } from "../../common/config/env";

const params = {
  user: env.db_user,
  host: env.db_host,
  password: env.db_password,
  database: env.db_database,
};


export const knex = Knex({
    client: "mysql2",
    connection: params,
    acquireConnectionTimeout: 2000,
})
