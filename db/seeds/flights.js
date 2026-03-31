/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("flights").del();
  let flights_data = [];

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
      iata_code: airport.iata_code,
    }));

  for (let i = 0; i < 10000; i++) {
    let randArrival = Math.floor(Math.random() * (1192 - 0 + 1));
    let randDeparture = Math.floor(Math.random() * (1192 - 0 + 1));
    let departure_time = faker.date.soon().toISOString();
    const rawDepAirport = filteredAirportData[randDeparture];
    const rawArrAirport = filteredAirportData[randArrival];

    const rawAirline = faker.airline.airline();

    const depAirport = {
      name: rawDepAirport.name,
      iata: rawDepAirport.iata_code,
    };
    const arrAirport = {
      name: rawArrAirport.name,
      iata: rawArrAirport.iata_code,
    };

    const airline = {
      name: rawAirline.name,
      iata: rawAirline.iataCode,
    };
    const flight_obj = {
      airline: airline,
      departing_airport: depAirport,
      dep_iata: depAirport.iata,
      arrival_airport: arrAirport,
      arr_iata: arrAirport.iata,
      departure_time: departure_time,
      estimtated_arrival_time: faker.date
        .soon({ refDate: departure_time })
        .toISOString(),
      flight_number: faker.airline.flightNumber(),
    };
    flights_data.push(flight_obj);
  }

  await knex.batchInsert("flights", flights_data, 200);
  console.log(`Successfully seeded ${flights_data.length} flights!`);
};
