const express = require("express");
const connection = require("./db");
const authenticateToken = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const Temperature = require("./models/Temperaturas");

const app = express();
const port = 4000;

app.use(express.json());
connection();

app.use("/auth", authRoutes);

app.get("/temperatures", authenticateToken, async (req, res) => {
  const temperatures = await Temperature.find();
  res.status(200).json(temperatures);
});

app.listen(port, () => {
  console.log(`API REST escuchando en el puerto ${port}`);
});
