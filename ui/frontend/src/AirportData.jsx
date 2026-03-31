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
    return <p>No active flights found for {airport.iata_code}</p>;
  }
  // if (!arrFlights) return <h1>data loading... or missing maybe</h1>;

  return (
    <div className="airport-data-container">
      <h5 className="flight-section-title">Live Flights</h5>
      <div className="flight-list">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-row">
            <div className="flight-id-col">
              <span className="flight-number">
                {flight.airline.iata}
                {flight.flight_number}
              </span>
              <span className="airline-name">{flight.airline.name}</span>
            </div>

            <div className="flight-route-col">
              <span className="iata-code">{flight.departing_airport.iata}</span>
              <span className="route-arrow">→</span>
              <span className="iata-code">{flight.arrival_airport.iata}</span>
            </div>

            <div className="flight-time-col">
              <span className="departure-time">
                {new Date(flight.departure_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="arrival-meta">
                Arr:{" "}
                {new Date(flight.estimtated_arrival_time).toLocaleTimeString(
                  [],
                  { hour: "2-digit", minute: "2-digit" },
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
