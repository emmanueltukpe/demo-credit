import { v4 as uuidv4 } from "uuid";
import { getUser } from "../users/users.repo";
import { knex } from "../../server/database/mysql.setup";
import {
  AccountExistsError,
  AccountNotExistsError,
  InsufficientFundsError,
} from "../../common/errors";
import { generatedAccountNumber } from "../base/utils/account.number.generator";

interface Account {
  account_name: string;
  user_id: string;
}

export const createAccount = async (body: Account) => {
  const user = await getUser(body.user_id);
  const userId = user[0].id;
  const accountExists = await knex
    .select()
    .from("Accounts")
    .where({ user : userId });    
  if (accountExists.length != 0) throw new AccountExistsError();
  const data = {
    id: uuidv4(),
    user: userId,
    account_name: body.account_name,
    account_number: generatedAccountNumber(),
  }
  await knex("Accounts").insert(data);
  return data;
};

export const getAccount = async (account_number: string) => {
  const user = await knex
    .select()
    .from("Accounts")
    .where({ account_number: account_number });
  if (!user) throw new AccountNotExistsError();
  return user;
};

export const session = async ({ account_number }) => {
  const users = await knex
    .select()
    .from("Accounts")
    .where({ account_number: account_number });
  if (!users) throw new AccountNotExistsError();
  return users;
};

/**
 * Debits an account by an amount
 *
 * @param {String} account_number the account number of the account to be debited
 * @param {Number} amount the amount to be debited
 */
export const debit = async (account_number: string, amount: number) => {
  const user = await getAccount(account_number);
  const accountBalance = user[0].account_balance;
  if (accountBalance < amount) throw new InsufficientFundsError();
  const newBal = accountBalance - amount;
  const updated = await knex
    .select()
    .from("Accounts")
    .where({ account_number: account_number })
    .update({ account_balance: newBal });
    return updated
};

export const credit = async (account_number: string, amount: number) => {
    const user = await getAccount(account_number);
    const accountBalance = user[0].account_balance;
    const newBal = accountBalance + amount;
    const updated = await knex
      .select()
      .from("Accounts")
      .where({ account_number: account_number })
      .update({ account_balance: newBal });
      return updated
  };
