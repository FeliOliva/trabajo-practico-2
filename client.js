const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:3000");

ws.on("open", () => {
  console.log("Conectado al servidor WebSocket");

  // Enviar un número aleatorio cada 5 segundos
  setInterval(() => {
    const randomNumber = (Math.random() * 35).toFixed(2); // Generar número aleatorio entre 0 y 35 con 2 decimales
    const message = `La temperatura enviada por el cliente es: ${randomNumber}°C`;
    ws.send(message);
  }, 5000);
});

ws.on("message", (data) => {
  console.log("Mensaje desde el servidor:", data.toString());
});

ws.on("close", () => {
  console.log("Desconectado del servidor WebSocket");
});

ws.on("error", (error) => {
  console.error("WebSocket error:", error);
});
