import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  data,
  useLocation,
} from "react-router-dom";
import Regions from "./Regions";
import Search from "./Search";
import WorldMap from "./WorldMap";

export default function Home({
  countries,
  setRegion,
  coords,
  setCoords,
  zoom,
  setZoom,
}) {
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
      <div className="banner">
        <Link
          to="/"
          onClick={() => {
            setZoom(2);
            setCoords([20, 0]);
          }}
        >
          <button>Home</button>
        </Link>
        <h1> Jacob's World Wide Web</h1>
      </div>
      <WorldMap zoom={zoom} coords={coords}></WorldMap>
      <div>
        <h2>Author:</h2>
        <h3>Jacob Thomas</h3>
      </div>
      <div>
        <h1>Airport Info</h1>
        {airportList.map((airport) => {
          return (
            <p key={airport.id}>
              {airport.name} || {airport.city} || {airport.size_acres} acres
            </p>
          );
        })}
      </div>
      <div className="center">
        <Search countries={countries}></Search>
        <Regions
          countries={countries}
          setRegion={setRegion}
          coords={coords}
          setCoords={setCoords}
          zoom={zoom}
          setZoom={setZoom}
        ></Regions>
      </div>
    </>
  );
}
