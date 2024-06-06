import React, { useState } from "react";
import "./App.css";

function App() {
  const [temperatures, setTemperatures] = useState([]);

  const ingresar = async () => {
    const username = "felipe";
    const password = "4321";
    let token;

    const data = {
      username: username,
      password: password,
    };

    try {
      const loginResponse = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!loginResponse.ok) {
        throw new Error("Error en la autenticación");
      }

      const loginData = await loginResponse.json();
      console.log("Respuesta del primer POST:", loginData);
      token = loginData.token;
      localStorage.setItem("token", token);

      if (token) {
        const temperatureResponse = await fetch(
          "http://localhost:4000/temperatures",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!temperatureResponse.ok) {
          throw new Error("Error al obtener las temperaturas");
        }

        const temperatureData = await temperatureResponse.json();
        console.log("Respuesta del segundo GET:", temperatureData);
        setTemperatures(temperatureData);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <button onClick={ingresar}>Ingresar</button>
      <div>
        <h2>Estadísticas de Temperaturas</h2>
        <ul>
          {temperatures.map((temperature, index) => (
            <li key={index}>
              {`Temperatura ${index + 1}: ${temperature.valor} °C`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
