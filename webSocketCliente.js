const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:8080");

setInterval(() => {
  const temperature = (Math.random() * 35).toFixed(2);
  const data = JSON.stringify({ temperature, timestamp: Date.now() });
  ws.send(data);
}, 5000);

ws.on("open", () => {
  console.log("Conexión establecida con el servidor WebSocket.");
});
