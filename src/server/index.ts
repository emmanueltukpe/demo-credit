import http from "http";
import { env } from "../common/config/env";
import logger from "../common/logger";
import App from "./app";

const start = async () => {
  try {
    const app = new App();
    const appServer = app.getServer();
    const httpServer = http.createServer(appServer);
    httpServer.listen(env.port);
    httpServer.on("listening", () =>
      logger.message(
        `🚀  ${env.service_name} running in ${env.app_env}. Listening on ` +
          env.port
      )
    );
  } catch (err) {
    logger.error(err, "Fatal server error");
  }
};

start();
