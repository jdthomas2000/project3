/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { parse } = require("csv-parse/sync");
const { stringify } = require("csv-stringify/sync");
const fs = require("fs");
const path = require("path");

exports.seed = async function (knex) {
  await knex("airports").del();

  const myPath = path.join(__dirname, "../data/airports.csv");
  let airportData = [];

  const content = fs.readFileSync(myPath, "utf-8");

  airportData = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const filteredAirportData = airportData
    .filter(
      (airport) => airport.type === "large_airport" && airport.wikipedia_link,
    )
    .map((airport) => ({
      name: airport.name,
      iso_country: airport.iso_country,
      iata_code: airport.iata_code,
      elevation_ft: parseInt(airport.elevation_ft) || 0,
      latitude_deg: parseFloat(airport.latitude_deg),
      longitude_deg: parseFloat(airport.longitude_deg),
      wikipedia_link: airport.wikipedia_link,
    }));

  if (filteredAirportData.length > 0) {
    await knex.batchInsert("airports", filteredAirportData, 200);
    console.log(`Successfully seeded ${filteredAirportData.length} airports!`);
  }
};
