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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Search({ countries }) {
  const [countriesList, setCountriesList] = useState([]);
  useEffect(() => {
    if (countries && countries.length > 0) {
      const countryNames = countries.map((country) => country.name.common);
      setCountriesList(countryNames);
    }
  }, [countries]);

  const navigate = useNavigate();

  return (
    <>
      <div className="search-container">
        <Autocomplete
          className="glass-input"
          disablePortal
          options={countriesList.sort()}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Search for Country..." />
          )}
          onChange={(event, value) => {
            if (value) {
              navigate(`/name/${value}`);
            }
          }}
        />
      </div>
    </>
  );
}
