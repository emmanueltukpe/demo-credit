import jwt from "jsonwebtoken"
import { BaseController } from "./base.controller";
import { Request, Response } from "express";
import { createAccount, getAccount, session, debit } from "../../data/accounts/accounts.repo";
import { env } from "../../common/config/env";

export class AccountController extends BaseController {
  create = async (req: Request, res: Response) => {
    try {
      req.body.user_id = req.user.data;

      const data = await createAccount(req.body);
      this.handleSuccess(req, res, data);
    } catch (err) {
      this.handleError(req, res, err);
    }
  };

  getAccountBalance = async (req: Request, res: Response) => {
    try {
      const data = await getAccount(req.params.id);
      const accountBalance = {
        account_number: data[0].account_number,
        account_balance: data[0].account_balance,
      };

      this.handleSuccess(req, res, accountBalance);
    } catch (err) {
      this.handleError(req, res, err);
    }
  };

  createTransactionSession = async (req: Request, res: Response) => {
    try {
      const { account_number } =req.body
      const data = await session({ account_number });
      const accountNumber = data[0].account_number
      const token = jwt.sign(accountNumber, env.jwt_secret)
      this.handleSuccess(req, res, {accountNumber, token});
    } catch (err) {
      this.handleError(req, res, err);
    }
  }
}

export const accounts = new AccountController();
