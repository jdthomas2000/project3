/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("gdp", (table) => {
    table.increments("id");
    table.string("name").notNullable();

    table.string("country_code").notNullable();

    for (let i = 2000; i < 2026; i++) {
      table.decimal(`gdp_${i}`, 25, 2);
    }

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("gdp");
};
