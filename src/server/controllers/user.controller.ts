import { BaseController } from "./base.controller";
import { Request, Response } from "express";

export class UserController extends BaseController {
  login = async (req: Request, res: Response) => {
    try {
      const data = "success";
      this.handleSuccess(req, res, data);
    } catch (err) {
      this.handleError(req, res, err);
    }
  };

  signup = async (req: Request, res: Response) => {
    try {
      const data = "success";
      this.handleSuccess(req, res, data);
    } catch (err) {
      this.handleError(req, res, err);
    }
  };
}

export const users = new UserController();