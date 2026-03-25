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
import Search from "./Search";

export default function RegionDetail({
  countries,
  region,
  zoom,
  coords,
  setCoords,
  setZoom,
}) {
  const CountriesFiltered = countries.filter((country) => {
    return country.region.toLowerCase() === region;
  });
  if (CountriesFiltered.length === 0) return <h1>Loading....</h1>;

  const sortedCountries = [...CountriesFiltered].sort((a, b) => {
    return a.name.common > b.name.common ? 1 : -1;
  });

  return (
    <>
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
        <h1> {region.toUpperCase()}</h1>
      </div>
      <WorldMap coords={coords} zoom={zoom}></WorldMap>
      <div className="center">
        <Search countries={CountriesFiltered}></Search>
        <div className="region-detail-card-wrapper">
          {sortedCountries.map((country) => {
            return (
              <Link
                key={country.name.official}
                to={`/name/${country.name.common}`}
              >
                <div className="region-detail-card">
                  <div className="flag-container">
                    <img
                      className="temp"
                      src={country.flags.png}
                      alt={country.name.official}
                    ></img>
                  </div>
                  <h2>{country.name.common}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
