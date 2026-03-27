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

export default function Graph({ countryData }) {
  const [gdpData, setGdpData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/gdp/${countryData.cca3}`)
      .then((res) => res.json())
      .then((data) => {
        setGdpData(data[0]);
      });
  }, [countryData]);

  if (!gdpData) return <h1>data loading... or missing maybe</h1>;

  return (
    <>
      <h1>
        {gdpData.name} {gdpData.country_code}
      </h1>
    </>
  );
}
