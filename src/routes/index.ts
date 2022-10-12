import { Router } from "express";

const v1Router = Router();

import { users, accounts, transactions } from "../server/controllers";
import { auth } from "../server/middleware/auth";

// users
v1Router
  .post("/users/signup", users.signup)
  .post("/users/login", users.login);

// accounts
v1Router
  .post("/accounts", auth, accounts.create)
  .post("/accounts/session", auth, accounts.createTransactionSession)
  .get("/accounts/:id/balance", auth, accounts.getAccountBalance);

v1Router
  .post("/transactions/transfers", auth, transactions.transfer)
  .post("/transactions/deposit", auth, transactions.deposit)
  .post("/transactions/withdraw", auth, transactions.withdraw)
  .get("/accounts/:id/transactions", auth, transactions.getAllTransactions);

export default v1Router;
