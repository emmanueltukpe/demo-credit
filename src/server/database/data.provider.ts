import { Knex } from "knex";

import mysqlSetup from "./mysql.setup";

export interface DataClient {
  mysql: Knex;
}

export async function create(): Promise<DataClient> {
  return {
    mysql: await mysqlSetup.create(),
  };
}

export default create();
