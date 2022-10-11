import express, { Application, Router } from "express";
import cors from "cors";
import helmet from "helmet";
import v1Router from "../routes";
import jsend from "./middleware/jsend";
import loggerMiddleware from "./middleware/requestLogger";
import { logResponseBody } from "./middleware/logResponseBody";

export default class App {
  private server: Application;

  constructor() {
    this.server = express();

    this.registerMiddlewares();
    this.registerHandlers();
  }

  /**
   * Registers middlewares on the application server
   */
  private registerMiddlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));

    this.server.disable("x-powered-by");
    this.server.use(helmet());
    this.server.use(cors());

    this.server.use(loggerMiddleware);
    this.server.use(logResponseBody);
    this.server.use(jsend);
  }

  /**
   * Registers utility handlers
   */
  private registerHandlers() {
    const router = Router();
    router.use("/v1", v1Router);

    this.server.use("/api", router);

    this.server.get("/", (req, res) => {
      res.status(200).json({ status: "Welcome to Demo Credit!!" });
    });

    this.server.use((req, res, next) => {
      res.status(404).send("Whoops! Route doesn't exist.");
    });
  }

  /**
   * Applies all routes and configuration to the server, returning the express application server.
   */
  getServer() {
    return this.server;
  }
}
