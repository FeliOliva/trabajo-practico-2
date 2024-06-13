// server.js
const express = require("express");
const connection = require("./db");
const authenticateToken = require("./middlewares/authMiddleware");
const authRouter = require("./routes/authRoutes"); // Cambia 'authRoutes' por 'authRouter'
const Temperature = require("./models/Temperaturas");
const cors = require("cors"); // Importa el middleware de CORS
const path = require("path"); // Importa path para manejar rutas

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors()); // Agrega el middleware de CORS
connection();

app.use("/auth", authRouter); // Usa el router 'authRouter' en lugar del objeto 'authRoutes'

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get("/temperatures", authenticateToken, async (req, res) => {
  try {
    const temperatures = await Temperature.find();
    res.status(200).json(temperatures);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las temperaturas" });
  }
});

app.listen(port, () => {
  console.log(`API REST escuchando en el puerto ${port}`);
});
