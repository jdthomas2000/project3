import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  data,
  useLocation,
  useParams,
} from "react-router-dom";

export default function AirportData({ airport }) {
  const [flights, setFlights] = useState(null);

  useEffect(() => {
    //   // const MOCK_FLIGHTS = {
    //   //   data: [
    //   //     {
    //   //       flight: { iata: "WN123" },
    //   //       departure: {
    //   //         airport: "Sacramento Intl",
    //   //         estimated: "2026-03-30T12:00:00",
    //   //       },
    //   //       arrival: {
    //   //         airport: "Los Angeles Intl",
    //   //         estimated: "2026-03-30T13:30:00",
    //   //       },
    //   //     },
    //   //     {
    //   //       flight: { iata: "DL123" },
    //   //       departure: {
    //   //         airport: "Sacramento Intl",
    //   //         estimated: "2026-03-30T12:00:00",
    //   //       },
    //   //       arrival: {
    //   //         airport: "Burbank Intl",
    //   //         estimated: "2026-03-30T13:30:00",
    //   //       },
    //   //     },
    //   //     {
    //   //       flight: { iata: "AA123" },
    //   //       departure: {
    //   //         airport: "Sacramento Intl",
    //   //         estimated: "2026-03-30T12:00:00",
    //   //       },
    //   //       arrival: {
    //   //         airport: "Long Beach Intl",
    //   //         estimated: "2026-03-30T13:30:00",
    //   //       },
    //   //     },
    //   //   ],
    //   // };

    //   // setDepFlights(MOCK_FLIGHTS.data);

    fetch(`http://localhost:3000/flights/${airport.iata_code}`)
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
      });

    //   //     fetch(`
    //   // https://api.aviationstack.com/v1/flights?access_key=e0f6d07f16bbaede49d23b95be08ad75&flight_status=active&arr_iata=${airport.iata_code}`)
    //   //       .then((res) => res.json())
    //   //       .then((data) => {
    //   //         setArrFlights(data);
    //   //       });
  }, [airport.iata_code]);

  if (!flights || flights.length === 0) {
    return <p>No flights found for {airport.iata_code}</p>;
  }
  // if (!arrFlights) return <h1>data loading... or missing maybe</h1>;

  return (
    <div>
      {flights.map((flight) => (
        <div key={flight.id}>
          <div>
            {" "}
            Flight Info
            <p>
              Airline {flight.airline.iata} - {flight.airline.name}
              Flight Number: {flight.flight_number}
            </p>
            Departure Info
            <p>
              Departing Airport: {flight.departing_airport.name}{" "}
              {flight.departing_airport.iata}{" "}
            </p>
            <p>
              {new Date(flight.departure_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            Arrival Info
            <p>
              Arrival Airport: {flight.arrival_airport.name}{" "}
              {flight.arrival_airport.iata}
            </p>
            <p>
              {new Date(flight.estimtated_arrival_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
