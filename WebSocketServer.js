const express = require("express");
const WebSocket = require("ws");
const axios = require("axios");
const connection = require("./db"); 

const app = express();
const port = 8080;
const server = app.listen(port, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${port}`);
});

connection();

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message);
    console.log("Temperatura recibida:", data);

    // Enviar datos a todos los clientes conectados
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });

    try {
      await axios.post("http://localhost:3000/webhook", data);
    } catch (error) {
      console.error("Error enviando datos al webhook:", error);
    }
  });
});
