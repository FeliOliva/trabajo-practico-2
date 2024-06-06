const express = require("express");
const connection = require("./db");
const authenticateToken = require("./middlewares/authMiddleware");
const authRouter = require("./routes/authRoutes"); // Cambia 'authRoutes' por 'authRouter'
const Temperature = require("./models/Temperaturas");
const cors = require("cors"); // Importa el middleware de CORS

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors()); // Agrega el middleware de CORS
connection();

app.use("/auth", authRouter); // Usa el router 'authRouter' en lugar del objeto 'authRoutes'

app.get("/temperatures", authenticateToken, async (req, res) => {
  const temperatures = await Temperature.find();
  res.status(200).json(temperatures);
});

app.listen(port, () => {
  console.log(`API REST escuchando en el puerto ${port}`);
});
