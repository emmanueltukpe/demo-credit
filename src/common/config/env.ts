import dotenv from "dotenv";

dotenv.config();

const env = {
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
};

export default env;
