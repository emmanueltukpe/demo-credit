require('ts-node').register()
const knex = require("./src/common/config/env")

module.exports = knex.knex