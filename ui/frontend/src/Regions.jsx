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

export default function Regions({
  countries,
  setRegion,
  coords,
  setCoords,
  zoom,
  setZoom,
}) {
  return (
    <>
      <div className="region-card-container">
        <div className="region-card">
          <Link to="/region/asia">
            <img
              onClick={() => {
                setCoords([34, 100]);
                setZoom(4);
                return setRegion("asia");
              }}
              className="mapImage"
              src="https://plus.unsplash.com/premium_photo-1661962643046-198516c2bec0?fm=jpg&q=80&w=1000&h=1600&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXQlMjBmdWppfGVufDB8fDB8fHww"
              alt="asia"
            ></img>
          </Link>
          <div className="region-info">
            <div>ASIA</div>
            <p> Number of Countries: 50</p>
            <p>Population: 4.8 Billion</p>
            <p>
              {" "}
              Fun Fact: Both the highest point on Earth (Mount Everest) and the
              lowest point (The Dead Sea) are in Asia
            </p>
          </div>
        </div>
        <div className="region-card">
          <Link to="/region/africa">
            <img
              onClick={() => {
                setCoords([2, 16]);
                setZoom(4);
                return setRegion("africa");
              }}
              className="mapImage"
              src="https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg?cs=srgb&dl=pexels-pixabay-59989.jpg&fm=jpg"
              alt="Africa"
            ></img>
          </Link>
          <div className="region-info">
            <div>AFRICA</div>
            <p> Number of Countries: 54</p>
            <p>Population: 1.5 Billion</p>
            <p> Fun Fact: Over 2,000 languages are spoken across Africa</p>
          </div>
        </div>
        <div className="region-card">
          <Link to="/region/americas">
            <img
              onClick={() => {
                setCoords([15, -90]);
                setZoom(4);
                return setRegion("americas");
              }}
              className="mapImage"
              src="https://images7.alphacoders.com/359/359867.jpg"
              alt="America"
            ></img>
          </Link>
          <div className="region-info">
            <div>AMERICAS</div>
            <p> Number of Countries: 35</p>
            <p>Population: 1.1 Billion</p>
            <p>
              {" "}
              Fun Fact: The largest pyramid in the world is in the Americas
              (Mexico)
            </p>
          </div>
        </div>
        <div className="region-card">
          <Link to="/region/europe">
            <img
              onClick={() => {
                setCoords([54, 15]);
                setZoom(4);
                return setRegion("europe");
              }}
              className="mapImage"
              src="https://images.pexels.com/photos/6498686/pexels-photo-6498686.jpeg"
              alt="europe"
            ></img>
          </Link>
          <div className="region-info">
            <div>Europe</div>
            <p> Number of Countries: 50</p>
            <p>Population: 1.5 Billion</p>
            <p>
              {" "}
              Fun Fact: Both the smallest (Vatican City) and largest (Russia)
              countries are in Europe
            </p>
          </div>
        </div>
        <div className="region-card">
          <Link to="/region/oceania">
            <img
              onClick={() => {
                setCoords([-25, 135]);
                setZoom(4);
                return setRegion("oceania");
              }}
              className="mapImage"
              src="https://cdn.shopify.com/s/files/1/1901/8767/files/5-best-places-photograph-sydney-opera-house-patkay-away-2.jpg"
              alt="oceania"
            ></img>
          </Link>
          <div className="region-info">
            <div>Oceania</div>
            <p> Number of Countries: 14 </p>
            <p>Population: 46 Million</p>
            <p> Fun Fact: Oceania has more sheep than people</p>
          </div>
        </div>
      </div>
    </>
  );
}
