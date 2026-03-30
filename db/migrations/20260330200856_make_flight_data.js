/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("flights", (table) => {
    table.increments("id");

    table.json("airline").notNullable();
    table.json("departing_airport").notNullable();
    table.string("dep_iata");
    table.json("arrival_airport").notNullable();
    table.string("arr_iata");

    table.string("departure_time");
    table.string("estimtated_arrival_time");
    table.string("flight_number");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("flights");
};
