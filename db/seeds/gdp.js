/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { parse } = require("csv-parse/sync");
const { stringify } = require("csv-stringify/sync");
const fs = require("fs");
const { validateHeaderName } = require("http");
const path = require("path");

exports.seed = async function (knex) {
  await knex("gdp").del();

  const myPath = path.join(__dirname, "../data/gdp.csv");
  let gdpData = [];

  const content = fs.readFileSync(myPath, "utf-8");

  gdpData = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  });

  const gdp_years = (c) => {
    let gdp_obj = {};
    for (let i = 2000; i < 2026; i++) {
      const value = c[String(i)];
      gdp_obj[`gdp_${i}`] = value ? parseFloat(value) : null;
    }
    return gdp_obj;
  };

  const filteredGDPData = gdpData.map((c) => ({
    name: c["Country Name"],
    country_code: c["Country Code"],
    ...gdp_years(c),
  }));

  if (filteredGDPData.length > 0) {
    await knex.batchInsert("gdp", filteredGDPData, 500);
    console.log(`Seeded ${filteredGDPData.length} countries!`);
  } else {
    console.log("No countries found matching the criteria.");
  }
};
