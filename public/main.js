document.addEventListener('DOMContentLoaded', async () => {
  await loadTemperatures();
});

let temperatureChart; // Variable global para el gráfico

async function loadTemperatures() {
  try {
    const response = await fetch('http://localhost:4000/temperatures', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener las temperaturas');
    }

    const temperatures = await response.json();
    console.log("la data es " + JSON.stringify(temperatures));

    const temperatureData = temperatures.map(data => data.temperatura);
    const labels = temperatures.map(data => new Date(data.horario).toLocaleDateString());

    // Crear el gráfico si aún no existe
    if (!temperatureChart) {
      const ctx = document.getElementById('temperatureChart').getContext('2d');
      temperatureChart = new Chart(ctx, {
        type: 'line', // Tipo de gráfico
        data: {
          labels,
          datasets: [{
            label: 'Temperatura',
            data: temperatureData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      // Actualizar el gráfico existente
      temperatureChart.data.labels = labels;
      temperatureChart.data.datasets[0].data = temperatureData;
      temperatureChart.update();
    }
  } catch (error) {
    console.error('Error al cargar las temperaturas:', error);
  }
}
  
// // Crear una conexión WebSocket con el servidor
// const ws = new WebSocket("ws://localhost:8080");

// // Elemento del DOM donde se mostrarán las temperaturas
// const temperatureList = document.getElementById('temperatureList');

// // Manejar la apertura de la conexión
// ws.onopen = () => {
//   console.log("Conexión establecida con el servidor WebSocketttt.");
// };

// // Manejar la recepción de mensajes
// ws.onmessage = (event) => {
//     console.log("entro en el onmessage");
//   try {
//     const data = JSON.parse(event.data);
//     console.log("Temperatura recibida:", data);

//     // Crear un nuevo elemento de lista para mostrar la temperatura
//     const listItem = document.createElement('li');
//     listItem.textContent = `Temperatura: ${data.temperature} °C - Hora: ${new Date(data.timestamp).toLocaleTimeString()}`;
    
//     // Agregar el nuevo elemento a la lista
//     temperatureList.appendChild(listItem);
//   } catch (error) {
//     console.error("Error al analizar el mensaje recibido:", error);
//   }
// };

// // Manejar el cierre de la conexión
// ws.onclose = () => {
//   console.log("Conexión cerrada con el servidor WebSocket.");
// };

// // Manejar errores de la conexión
// ws.onerror = (error) => {
//   console.error("Error en la conexión WebSocket:", error);
// };
