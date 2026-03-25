var express = require("express");
const knex = require("knex");
const knexfile = require("../db/knexfile");
const db = knex(knexfile.development);
const cors = require("cors");

var app = express();
var port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.json({ message: "hope this works" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/airports", async (req, res) => {
  try {
    const result = await db("airports").select("*");
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/airports/:country", async (req, res) => {
  try {
    const result = await db("airports")
      .select("*")
      .where("iso_country", "=", req.params.country.toUpperCase());
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});
