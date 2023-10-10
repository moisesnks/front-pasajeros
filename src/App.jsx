import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pasajeros, setPasajeros] = useState([]);
  const [rutInput, setRutInput] = useState('');

  const fetchPasajeros = () => {
    fetch('http://pasajeros-service:80/pasajeros')
      .then(response => response.json())
      .then(data => setPasajeros(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const fetchPasajeroPorRut = () => {
    if (!rutInput) {
      // Si el campo de entrada está vacío, obtener todos los pasajeros
      fetchPasajeros();
      return;
    }

    fetch(`http://pasajeros-service:80/pasajeros/${rutInput}`)
      .then(response => response.json())
      .then(data => setPasajeros([data]))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchPasajeros();
  }, []);

  return (
    <div className="App">
      <h1>Listado de Pasajeros</h1>
      <div>
        <label htmlFor="rutInput">Ingresa un RUT:</label>
        <input
          type="text"
          id="rutInput"
          value={rutInput}
          onChange={e => setRutInput(e.target.value)}
        />
        <button onClick={fetchPasajeroPorRut}>Buscar</button>
      </div>
      <ul>
        {pasajeros.map(pasajero => (
          <li key={pasajero.rut}>
            <strong>Rut:</strong> {pasajero.rut},{' '}
            <strong>Nombre:</strong> {pasajero.nombre},{' '}
            <strong>Origen:</strong> {pasajero.origen},{' '}
            <strong>Destino:</strong> {pasajero.destino},{' '}
            <strong>Precio:</strong> {pasajero.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
