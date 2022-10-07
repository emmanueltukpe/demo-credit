import { BaseController } from "./base.controller";
import { Request, Response } from "express";

export class AccountController extends BaseController {
    create = async (req: Request, res: Response) => {
      try {
        const data = "success";
        this.handleSuccess(req, res, data);
      } catch (err) {
        this.handleError(req, res, err);
      }
    };
  
    getAccountBalance = async (req: Request, res: Response) => {
      try {
        const data = "success";
        this.handleSuccess(req, res, data);
      } catch (err) {
        this.handleError(req, res, err);
      }
    };
  }
  
  export const accounts = new AccountController();