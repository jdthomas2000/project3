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

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

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

  const compactFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });

  const data = [];

  for (let i = 2000; i < 2025; i++) {
    const dataObj = { year: null, gdp: null };

    dataObj.year = i;
    dataObj.gdp = Number(gdpData[`gdp_${i}`]) || 0;

    data.push(dataObj);
  }

  // console.log(data);

  return (
    <div className="graph">
      <h3 className="graph-title">
        GDP Growth: {gdpData.name} ({gdpData.country_code})
      </h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border-3)"
            />

            <XAxis dataKey="year" stroke="var(--color-text-3)" interval={4} />

            <YAxis
              dataKey="gdp"
              stroke="var(--color-text-3)"
              tickFormatter={(val) => compactFormatter.format(val)}
            />

            <Tooltip
              formatter={(val) => compactFormatter.format(val)}
              cursor={{ stroke: "var(--color-border-2)" }}
              contentStyle={{
                backgroundColor: "var(--color-surface-raised)",
                borderColor: "var(--color-border-2)",
              }}
            />

            <Line
              type="monotone"
              dataKey="gdp"
              stroke="var(--color-chart-1)"
              dot={{ fill: "var(--color-surface-base)" }}
              activeDot={{ r: 8, stroke: "var(--color-surface-base)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
