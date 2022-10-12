import jwt from "jsonwebtoken"
import { BaseController } from "./base.controller";
import { Request, Response } from "express";
import { signup, login } from "../../data/users/users.repo";
import { env } from "../../common/config/env";

export class UserController extends BaseController {
  signup = async (req: Request, res: Response) => {
    try {
      const data = await signup(req.body);
      
      this.handleSuccess(req, res, data);
    } catch (err) {
      this.handleError(req, res, err);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const {email, password} = req.body
      const user = await login({email, password});
      const data = user[0].id
      
      const token = jwt.sign({data, email}, env.jwt_secret, { expiresIn: "365d" })
      this.handleSuccess(req, res, {data, token});
    } catch (err) {
      this.handleError(req, res, err);
    }
  };
}

export const users = new UserController();