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
import Home from "./Home";
import RegionDetail from "./RegionDetail";
import CountryDetail from "./CountryDetail";
import WorldMap from "./WorldMap";

function App() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [coords, setCoords] = useState([20, 0]);
  const [zoom, setZoom] = useState(3);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,region")
      .then((res) => res.json())
      .then((data) => {
        return setCountries(data);
      });
  }, []);

  if (!countries) return <h1>LOADING...</h1>;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              countries={countries}
              setRegion={setRegion}
              coords={coords}
              setCoords={setCoords}
              zoom={zoom}
              setZoom={setZoom}
            ></Home>
          }
        ></Route>
        <Route
          path="/region/:regionName"
          element={
            <RegionDetail
              countries={countries}
              region={region}
              coords={coords}
              setCoords={setCoords}
              zoom={zoom}
              setZoom={setZoom}
            ></RegionDetail>
          }
        ></Route>
        <Route
          path="/name/:countryName"
          element={
            <CountryDetail
              setCoords={setCoords}
              setZoom={setZoom}
              coords={coords}
              zoom={zoom}
            ></CountryDetail>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
