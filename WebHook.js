const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect("your-mongodb-connection-string", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const temperatureSchema = new mongoose.Schema({
  temperature: Number,
  timestamp: Number,
});
const Temperature = mongoose.model("Temperature", temperatureSchema);

app.post("/webhook", async (req, res) => {
  const { temperature, timestamp } = req.body;
  const newTemperature = new Temperature({ temperature, timestamp });
  await newTemperature.save();
  res.status(200).send("Datos guardados exitosamente");
});

app.listen(port, () => {
  console.log(`Webhook escuchando en el puerto ${port}`);
});
