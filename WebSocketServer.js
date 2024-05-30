const express = require("express");
const WebSocket = require("ws");
const axios = require("axios");

const app = express();
const port = 8080;
const wss = new WebSocket.Server({ server: app.listen(port) });

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message);
    console.log("Temperatura recibida:", data);
    try {
      await axios.post("http://localhost:3000/webhook", data);
    } catch (error) {
      console.error("Error enviando datos al webhook:", error);
    }
  });
});

console.log(`Servidor WebSocket escuchando en el puerto ${port}`);
