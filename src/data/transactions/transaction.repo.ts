import { credit, debit, getAccount } from "../accounts/accounts.repo";
import { AccountNotExistsError } from "../../common/errors";
import { v4 as uuidv4 } from "uuid";
import { knex } from "../../server/database/mysql.setup";

interface Transaction {
  sender_account_number: string;
  recipient_account_number: string;
  amount: number;
}

interface Ifund {
  recipient_account_number: string;
  amount: number;
}

interface Iwithdraw {
  sender_account_number: string;
  amount: number;
}

export const fund = async (body: Ifund) => {
  const account = await getAccount(body.recipient_account_number);
  if (!account) throw new AccountNotExistsError();
  const accountNumber = account[0].account_number;
  const accountId = account[0].id;
  await credit(accountNumber, body.amount);
  const data = {
    id: uuidv4(),
    transaction_type: "Fund",
    sender_account_number: accountNumber,
    sender_id: accountId,
    recipient_account_number: accountNumber,
    amount: body.amount,
    recipient_id: accountId,
  }
  await knex("Transactions").insert(data);
  return data;
};

export const withdraw = async (body: Iwithdraw) => {
  const account = await getAccount(body.sender_account_number);
  if (!account) throw new AccountNotExistsError();
  const accountNumber = account[0].account_number;
  const accountId = account[0].id;
  await debit(accountNumber, body.amount);
  const data = {
    id: uuidv4(),
    transaction_type: "Withdrawal",
    sender_account_number: accountNumber,
    sender_id: accountId,
    recipient_account_number: accountNumber,
    amount: body.amount,
    recipient_id: accountId,
  }
  await knex("Transactions").insert(data);
  return data;
};

export const transfer = async (body: Transaction) => {
  const senderAccount = await getAccount(body.sender_account_number);
  if (!senderAccount) throw new AccountNotExistsError();
  const senderAccountNumber = senderAccount[0].account_number;
  const senderAccountId = senderAccount[0].id;
  await debit(senderAccountNumber, body.amount);

  const recipientAccount = await getAccount(body.recipient_account_number);
  if (!recipientAccount) throw new AccountNotExistsError();
  const recipientAccountNumber = recipientAccount[0].account_number;
  const recipientAccountId = recipientAccount[0].id;
  await credit(recipientAccountNumber, body.amount);

  const data = {
    id: uuidv4(),
    transaction_type: "Transfer",
    sender_account_number: senderAccountNumber,
    amount: body.amount,
    sender_id: senderAccountId,
    recipient_account_number: recipientAccountNumber,
    recipient_id: recipientAccountId,
  }
  await knex("Transactions").insert(data);
  return data;
};

export const getAllUserTransactions = async (account_number: string) => {
  const recipient = await knex
    .select()
    .from("Transactions")
    .where({ recipient_account_number: account_number });
  if (!recipient) throw new AccountNotExistsError();

  const sender = await knex
    .select()
    .from("Transactions")
    .where({ sender_account_number: account_number });
  if (!sender) throw new AccountNotExistsError();

  return [ ...sender, ...recipient]
};
