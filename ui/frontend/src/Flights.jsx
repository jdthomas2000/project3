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
import WorldMap from "./WorldMap";

export default function Flights({ setCoords, setZoom, coords, zoom }) {
  const [flights, setFlights] = useState(null);

  const { iata } = useParams();

  const navigate = useNavigate();

  const marker = [
    {
      lat: coords[0],
      lng: coords[1],
      name: iata,
      wikipedia_link: "n/a",
    },
  ];

  useEffect(() => {
    fetch(`http://localhost:3000/flights/all/${iata.toUpperCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
      });
  }, [iata]);

  if (!flights) return <h1>No Flights Avail</h1>;

  const departures = flights.filter((flight) => flight.dep_iata === iata);
  const arrivals = flights.filter((flight) => flight.arr_iata === iata);

  const airportName = arrivals[0].arrival_airport.name;

  return (
    <>
      <WorldMap
        coords={coords}
        zoom={zoom}
        markers={marker}
        setCoords={setCoords}
        setZoom={setZoom}
      />
      <div className="banner">
        <Link
          to="/"
          onClick={() => {
            setZoom(3);
            setCoords([20, 0]);
          }}
        >
          <button>Home</button>
        </Link>
        <h1>
          {airportName} ({iata})
        </h1>

        <button onClick={() => navigate(-1)}>Back to Country</button>
      </div>
      <div className="page-foreground">
        <div className="flights-container">
          <h2>Flight Board: {iata}</h2>

          <div className="flight-board">
            <div className="board-column">
              <h5 className="column-title">DEPARTURES</h5>
              <div className="flight-list">
                {departures.map((flight) => (
                  <div className="flight-row">
                    <div className="flight-id-col">
                      <span className="flight-number">
                        {flight.airline.iata}
                        {flight.flight_number}
                      </span>
                      <span className="airline-name">
                        {flight.airline.name}
                      </span>
                    </div>

                    <div className="flight-route-col">
                      <span className="iata-code">
                        {flight.departing_airport.iata}
                      </span>
                      <span className="route-arrow">→</span>
                      <span className="iata-code">
                        {flight.arrival_airport.iata}
                      </span>
                    </div>

                    <div className="flight-time-col">
                      <span className="departure-time">
                        {new Date(flight.departure_time).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                      <span className="arrival-meta">
                        Arr:{" "}
                        {new Date(
                          flight.estimtated_arrival_time,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="board-column">
              <h5 className="column-title">ARRIVALS</h5>
              <div className="flight-list">
                {arrivals.map((flight) => (
                  <div className="flight-row">
                    <div className="flight-id-col">
                      <span className="flight-number">
                        {flight.airline.iata}
                        {flight.flight_number}
                      </span>
                      <span className="airline-name">
                        {flight.airline.name}
                      </span>
                    </div>

                    <div className="flight-route-col">
                      <span className="iata-code">
                        {flight.departing_airport.iata}
                      </span>
                      <span className="route-arrow">→</span>
                      <span className="iata-code">
                        {flight.arrival_airport.iata}
                      </span>
                    </div>

                    <div className="flight-time-col">
                      <span className="departure-time">
                        {new Date(flight.departure_time).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                      <span className="arrival-meta">
                        Arr:{" "}
                        {new Date(
                          flight.estimtated_arrival_time,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
