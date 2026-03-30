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
  const [depFlights, setDepFlights] = useState(null);
  const [arrFlights, setArrFlights] = useState(null);

  useEffect(() => {
    const MOCK_FLIGHTS = {
      data: [
        {
          flight: { iata: "WN123" },
          departure: {
            airport: "Sacramento Intl",
            estimated: "2026-03-30T12:00:00",
          },
          arrival: {
            airport: "Los Angeles Intl",
            estimated: "2026-03-30T13:30:00",
          },
        },
        {
          flight: { iata: "DL123" },
          departure: {
            airport: "Sacramento Intl",
            estimated: "2026-03-30T12:00:00",
          },
          arrival: {
            airport: "Burbank Intl",
            estimated: "2026-03-30T13:30:00",
          },
        },
        {
          flight: { iata: "AA123" },
          departure: {
            airport: "Sacramento Intl",
            estimated: "2026-03-30T12:00:00",
          },
          arrival: {
            airport: "Long Beach Intl",
            estimated: "2026-03-30T13:30:00",
          },
        },
      ],
    };

    setDepFlights(MOCK_FLIGHTS.data);

    //     fetch(`
    // https://api.aviationstack.com/v1/flights?access_key=e0f6d07f16bbaede49d23b95be08ad75&flight_status=active&dep_iata=${airport.iata_code}`)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         setDepFlights(data);
    //       });

    //     fetch(`
    // https://api.aviationstack.com/v1/flights?access_key=e0f6d07f16bbaede49d23b95be08ad75&flight_status=active&arr_iata=${airport.iata_code}`)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         setArrFlights(data);
    //       });
  }, []);

  if (!depFlights) return <h1>data loading... or missing maybe</h1>;
  // if (!arrFlights) return <h1>data loading... or missing maybe</h1>;

  return (
    <div>
      {depFlights.map((flight) => (
        <>
          <div>
            {" "}
            Departure Info
            <p>{flight.departure.airport}</p>
            <p>
              {new Date(flight.departure.estimated).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          {/* <div>
            {" "}
            Arrival Info
            <P>{flight.arrival.airport}</P>
            <p>{flight.arrival.estimated}</p>
          </div> */}
        </>
      ))}
    </div>
  );
}
