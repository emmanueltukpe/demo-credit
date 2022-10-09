import { Router } from "express";

const v1Router = Router();

import { users, accounts, transactions } from "../server/controllers";

// users
v1Router.post("/users/signup", users.signup).post("/users/login", users.login);

// accounts
v1Router
  .post("/accounts", accounts.create)
  .get("/accounts/:id", accounts.getAccountBalance);

v1Router
  .post("/transfers", transactions.transfer)
  .post("/deposit", transactions.deposit)
  .post("/withdraw", transactions.withdraw)
  .get("/transactions", transactions.getAllTransactions)

export default v1Router;
