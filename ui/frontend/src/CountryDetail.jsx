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
import { Weather } from "./Weather";
import Gallery from "./Gallery";

export default function CountryDetail({ setCoords, setZoom, coords, zoom }) {
  const [countryData, setCountryData] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [airports, setAirports] = useState([]);
  const [isShown, setIsShown] = useState(null);

  const { countryName } = useParams();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        const country = data[0];
        setCountryData(country);
        if (country) {
          setCoords(country.latlng);
          setZoom(6);
          setCountryCode(country.cca2);
        }
      });
  }, [countryName, setCoords, setZoom]);

  useEffect(() => {
    if (!countryCode) return;
    fetch(`http://localhost:3000/airports/${countryCode}`)
      .then((res) => res.json())
      .then((data) => {
        setAirports(data);
      });
  }, [countryCode]);

  const latLongArray = airports.map((airport) => ({
    lat: airport.latitude_deg,
    lng: airport.longitude_deg,
    wikipedia_link: airport.wikipedia_link,
    name: airport.name,
  }));

  if (!countryData) return <h1>No Deets Avail</h1>;

  return (
    <>
      <WorldMap coords={coords} zoom={zoom} markers={latLongArray} />
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
        <h1>{countryData.name.common.toUpperCase()}</h1>
      </div>

      {!isShown && (
        <button className="map_overlay-btn" onClick={() => setIsShown(true)}>
          Show Deets
        </button>
      )}

      {isShown && (
        <div className="country-info-panel">
          <button className="close-panel" onClick={() => setIsShown(false)}>
            ×
          </button>

          <header>
            <h1>
              <strong>Official Name: </strong>
              {countryData.name.official}
            </h1>
            <h2>
              <strong>Capital:</strong> {countryData.capital[0]}
            </h2>
          </header>

          <section className="stats-grid">
            <p>
              <strong>Region:</strong> {countryData.region}
            </p>
            <p>
              <strong>Subregion:</strong> {countryData.subregion}
            </p>
            <p>
              <strong>Population:</strong>{" "}
              {countryData.population.toLocaleString()}
            </p>
          </section>

          <div className="lists-container">
            <p>
              <strong>Currencies:</strong>
            </p>
            <ul>
              {countryData.currencies ? (
                Object.values(countryData.currencies).map((currency) => (
                  <li key={currency.name}>{currency.name}</li>
                ))
              ) : (
                <li key="none">N/A</li>
              )}
            </ul>

            <p>
              <strong>Languages:</strong>
            </p>
            <ul>
              {countryData.languages ? (
                Object.values(countryData.languages).map((lang) => (
                  <li key={lang}>{lang}</li>
                ))
              ) : (
                <li key="none">N/A</li>
              )}
            </ul>
          </div>

          <div className="flags">
            <div className="visual-box">
              <p>
                <strong>Flag</strong>
              </p>
              <img src={countryData.flags.png} alt={countryData.flags.alt} />
            </div>

            <div className="visual-box">
              <p>
                <strong>Coat of Arms</strong>
              </p>
              <img src={countryData.coatOfArms.png} alt="Coat of Arms" />
            </div>
          </div>
          <div className="visual-box weather-box">
            <Weather coords={coords} />
          </div>

          {/* <Gallery query={`${countryData.name.common} scenery`}></Gallery> */}

          <div className="airport-section">
            <p>
              <strong>MAJOR AIRPORTS</strong>
            </p>
            <div className="airport-scroll-area">
              {airports.map((airport) => (
                <a href={airport.wikipedia_link} target="_blank">
                  <div
                    key={airport.iata_code || airport.name}
                    className="airport-card"
                  >
                    <p>
                      <strong>{airport.name}</strong> ({airport.iata_code})
                    </p>
                    <p>Elevation: {airport.elevation_ft} ft</p>
                    <p>
                      Location: {airport.latitude_deg}, {airport.longitude_deg}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// {
//   /* <Gallery query={`${countryData.name.common} scenery`}></Gallery> */
// }
