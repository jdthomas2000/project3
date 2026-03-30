/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require("@faker-js/faker");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("flights").del();
  let flights_data = [];

  for (let i = 0; i < 10000; i++) {
    let departure_time = faker.date.soon().toISOString();
    const rawDepAirport = faker.airline.airport();
    const rawArrAirport = faker.airline.airport();

    const rawAirline = faker.airline.airline();

    const depAirport = {
      name: rawDepAirport.name,
      iata: rawDepAirport.iataCode,
    };
    const arrAirport = {
      name: rawArrAirport.name,
      iata: rawArrAirport.iataCode,
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
