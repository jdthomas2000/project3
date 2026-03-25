import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [airportList, setAirportList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/airports")
      .then((res) => res.json())
      .then((data) => {
        setAirportList(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (airportList.length === 0) return <p>Loading airports...</p>;

  return (
    <>
      <div>
        <h2>Author:</h2>
        <h3>Jacob Thomas</h3>
      </div>

      <div id="center">
        <h1>Airport Info</h1>
        {airportList.map((airport) => {
          return (
            <p key={airport.id}>
              {airport.name} || {airport.city} || {airport.size_acres} acres
            </p>
          );
        })}
      </div>
    </>
  );
}

export default App;
