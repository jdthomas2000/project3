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

app.post("/airports/:country", async (req, res) => {
  try {
    await db("airports").insert(req.body);

    const result = await db("airports")
      .select("*")
      .where("iso_country", "=", req.params.country.toUpperCase());

    if (!result) return "loading results";

    return res.status(201).json({ Message_sent: result });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/airports/:country", async (req, res) => {
  try {
    await db("airports").select("*").where("name", "=", req.body.name).del();

    return res.status(201).json({ Airport_deleted: req.body.name });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/airports/:country", async (req, res) => {
  const { id, ...updateData } = req.body;
  try {
    await db("airports").where("name", "=", req.body.name).update(updateData);

    return res.status(201).json({ Airport_updated: req.body.name });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.get("/gdp", async (req, res) => {
  try {
    const result = await db("gdp").select("*");
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});
