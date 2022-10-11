import dotenv from "dotenv";

dotenv.config();

export const env = {
  /**
   * NodeJS runtime environment. See here https://stackoverflow.com/a/16979503
   * Possible values are "development" and "production".
   *
   * DON'T SET THIS MANUALLY
   */
  node_env: process.env.NODE_ENV || "development",
  service_name: process.env.SERVICE_NAME || "demo credit",
  /**
   * This application's runtime environment
   * Possible values are "development", "test", "production", "staging"
   */
  app_env: process.env.APP_ENV || "development",

  port: Number(process.env.PORT),
  worker_port: Number(process.env.WORKER_PORT),

  jwt_secret: process.env.JWT_SECRET,

  schema: "democredit",
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_port:  process.env.DB_PORT,
  db_database: process.env.DB_DATABASE,
  db_pool_min: Number(process.env.DB_POOL_MIN),
  db_pool_max: Number(process.env.DB_POOL_MAX),
  db_pool_idle: Number(process.env.DB_POOL_IDLE),

};

export const knex = {
  client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOSTNAME || env.db_host,
      database: process.env.DATABASE_NAME || env.db_database,
      user: process.env.DATABASE_USERNAME || env.db_user,
      password: process.env.DATABASE_PASSWORD || env.db_password,
      port: process.env.DATABASE_PORT || env.db_port,
    },
    migrations: {
      tableName: 'KnexMigrations',
      directory: 'migration'
    },
}
