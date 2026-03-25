/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("airport").del();
  await knex("airport").insert([
    {
      id: 1,
      name: "LAX",
      state: "CA",
      city: "Los Angeles",
      size_acres: "3500",
    },
    {
      id: 2,
      name: "SFO",
      state: "CA",
      city: "San Fransico",
      size_acres: "5207",
    },
    {
      id: 3,
      name: "SMF",
      state: "CA",
      city: "Sacramento",
      size_acres: "6000",
    },
  ]);
};
