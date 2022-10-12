import { BaseController } from "./base.controller";
import { Request, Response } from "express";
import { fund, getAllUserTransactions, transfer, withdraw } from "../../data/transactions/transaction.repo";

export class TransactionController extends BaseController {
  transfer = async (req: Request, res: Response) => {
    try {
      req.body.sender_account_number = req.user.accountNumber;
      const data = await transfer(req.body)

      this.handleSuccess(req, res, data);
    } catch (err) {
      this.handleError(req, res, err);
    }
  };
//2524159443
  deposit = async (req: Request, res: Response) => {
    try {
      req.body.recipient_account_number = req.user.accountNumber;
      const data = await fund(req.body);
      this.handleSuccess(req, res, data);
    } catch (err) {
      this.handleError(req, res, err);
    }
  };

  withdraw = async (req: Request, res: Response) => {
    try {
      req.body.sender_account_number = req.user.accountNumber;
     const data = await withdraw(req.body);

      this.handleSuccess(req, res, data);
    } catch (err) {
      this.handleError(req, res, err);
    }
  };

  getAllTransactions = async (req: Request, res: Response) => {
    try {
      const data = await getAllUserTransactions(req.params.id)

      this.handleSuccess(req, res, data);
    } catch (err) {
      this.handleError(req, res, err);
    }
  };
}

export const transactions = new TransactionController();
