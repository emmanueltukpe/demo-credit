import { Knex } from "knex";

import MigrationUtils from "../src/data/base/utils/MigrationUtils";
import { env } from "../src/common/config/env";

export async function up(knex: Knex) {
  const schema = MigrationUtils.schema(knex);

  await knex.raw(`CREATE SCHEMA IF NOT EXISTS ${env.schema};`);

  await knex.schema.withSchema(env.schema).createTable("Users", table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    table.string("full_name")
        .notNullable()
        .comment(`The Users' full anme`)

    table.string("email")
        .unique()
        .checkRegex('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
        .notNullable()
        .comment(`The Users' email address`)

    table.string("password")
        .notNullable()
        .comment(`The Users' password`)
  })

  await knex.schema.withSchema(env.schema).createTable('Accounts', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.string("account_name")
        .notNullable()
        .comment(`User's account_name`)
    table.string("account_number")
        .notNullable()
        .comment(`User's account_number`)
    table.integer("account_balance")
        .notNullable()
        .defaultTo(0)
        .comment(`User's account_balance`)

    columns
        .foreignUuid("user", {column: 'id', table: `${env.schema}.Users`}, true)
        .comment(`User created this account`)
  })

  await knex.schema.withSchema(env.schema).createTable('Transactions', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    table.string("transaction_type")
        .notNullable()
        .comment(`type of transaction`)

    table.string("sender_account_number")
        .nullable()
        .comment(`sender's account details`)

    table.string("recipient_account_number")
        .nullable()
        .comment(`recipient's account details`)

    table.integer("amount")
        .notNullable()
        .comment("amount to be sent")

        columns
        .foreignUuid("sender_id", {column: 'id', table: `${env.schema}.Accounts`}, true)
        .comment(`This account created this transaction`)

        columns
        .foreignUuid("recipient_id", {column: 'id', table: `${env.schema}.Accounts`}, true)
        .comment(`This account benefited from this transaction`)
  })
}


export async function down(_knex: Knex): Promise<void> {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}

