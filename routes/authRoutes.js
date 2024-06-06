const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const router = express.Router(); 

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Se requieren nombre de usuario y contraseña" });
  }

  if (username === "felipe" && password === "4321") {
    const token = generateToken({ username });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciales incorrectas" });
  }
});

//Genera Token
const generateToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: "1h" });
};

module.exports = router; 
