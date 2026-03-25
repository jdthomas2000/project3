/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("airports", (table) => {
    table.increments("id");
    table.string("name").notNullable();

    table.string("iso_country").notNullable();
    table.string("iata_code");

    table.integer("elevation_ft");

    table.decimal("latitude_deg");
    table.decimal("longitude_deg");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("airport");
};
