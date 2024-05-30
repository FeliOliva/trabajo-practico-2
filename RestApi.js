const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const secretKey = "your-secret-key";

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
const app = express();
const port = 4000;
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

app.get("/temperatures", authenticateToken, async (req, res) => {
  const temperatures = await Temperature.find();
  res.status(200).json(temperatures);
});
app.listen(port, () => {
  console.log(`API REST escuchando en el puerto ${port}`);
});
