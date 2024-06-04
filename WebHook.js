const express = require("express");
const mongoose = require("mongoose");
const connection = require("./db");
const Temperature = require("./models/Temperaturas");

const app = express();
const port = 3000;

app.use(express.json());
connection();

app.post("/webhook", async (req, res) => {
  const { temperature, timestamp } = req.body;
  const newTemperature = new Temperature({ temperature, timestamp });
  await newTemperature.save();
  res.status(200).send("Datos guardados exitosamente");
});

app.listen(port, () => {
  console.log(`Webhook escuchando en el puerto ${port}`);
});
