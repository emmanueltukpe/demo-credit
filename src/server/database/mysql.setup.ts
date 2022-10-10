import Knex from "knex";
import { env } from "../../common/config/env";

const params = {
  user: env.db_user,
  host: env.db_host,
  password: env.db_password,
  database: env.db_database,
};

export async function create() {
  const knex = Knex({
    client: "mysql2",
    connection: params,
    pool: {
      min: env.db_pool_min,
      max: env.db_pool_max,
      idleTimeoutMillis: env.db_pool_idle,
    },
    acquireConnectionTimeout: 2000,
  });

  try {
    await knex.raw("SELECT now()");

    return knex;
  } catch (error) {
    throw new Error(
      "Unable to connect to MySQL via Knex. Ensure a valid connection."
    );
  }
}

export default { create };
