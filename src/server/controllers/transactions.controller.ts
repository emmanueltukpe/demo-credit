import { BaseController } from "./base.controller";
import { Request, Response } from "express";

export class TransactionController extends BaseController {
    transfer = async (req: Request, res: Response) => {
      try {
        const data = "success";
        this.handleSuccess(req, res, data);
      } catch (err) {
        this.handleError(req, res, err);
      }
    };
  
    deposit = async (req: Request, res: Response) => {
      try {
        const data = "success";
        this.handleSuccess(req, res, data);
      } catch (err) {
        this.handleError(req, res, err);
      }
    };

    withdraw = async (req: Request, res: Response) => {
        try {
          const data = "success";
    
          this.handleSuccess(req, res, data);
        } catch (err) {
          this.handleError(req, res, err);
        }
      };
  }
  
  export const transactions = new TransactionController();