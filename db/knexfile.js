// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "database",
      port: 5432,
      user: "postgres",
      password: "docker",
      database: "dockerws",
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
    },
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
