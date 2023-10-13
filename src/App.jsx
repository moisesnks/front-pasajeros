import React, { useState, useEffect } from 'react';
import './Pasajeros.css';

const apiUrl = 'http://www.lumonidy.studio';

function InputForm({ rutInput, setRutInput, fetchPasajeroPorRut }) {
  return (
    <div className='input'>
      {/* Input para ingresar el RUT */}
      <label htmlFor="rutInput">Ingresa un RUT:</label>
      <input
        type="text"
        id="rutInput"
        value={rutInput}
        onChange={e => setRutInput(e.target.value)}
      />
      {/* Botón para iniciar la búsqueda */}
      <button onClick={fetchPasajeroPorRut}>Buscar</button>
    </div>
  );
}

function PasajerosList({ pasajeros }) {
  return (
    <div className="table-container">
      <table className='pasajeros-table'>
        <thead>
          <tr>
            <th>Rut</th>
            <th>Nombre</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {/* Lista de pasajeros */}
          {pasajeros.map(pasajero => (
            <tr key={pasajero.rut}>
              {/* Detalles del pasajero */}
              <td>{pasajero.rut}</td>
              <td>{pasajero.nombre}</td>
              <td>{pasajero.origen}</td>
              <td>{pasajero.destino}</td>
              <td>{pasajero.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function App() {
  const [pasajeros, setPasajeros] = useState([]);
  const [rutInput, setRutInput] = useState('');

  const fetchPasajeros = () => {
    fetch(`${apiUrl}/pasajeros`)
      .then(response => response.json())
      .then(data => setPasajeros(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const fetchPasajeroPorRut = () => {
    if (!rutInput) {
      fetchPasajeros();
      return;
    }

    fetch(`${apiUrl}/pasajeros/${rutInput}`)
      .then(response => response.json())
      .then(data => setPasajeros([data]))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchPasajeros();
  }, []);

  return (
    <section className="App">
      <div className="pasajeros">
        <h1> Pasajeros Front</h1>
        <div className="content">
          <div className="pasajero ver">
            <h2> Lista de Pasajeros </h2>
            <PasajerosList pasajeros={pasajeros} />
          </div>
          <div className="pasajero buscar">
            <h2> Buscar Pasajero </h2>
            <InputForm
              rutInput={rutInput}
              setRutInput={setRutInput}
              fetchPasajeroPorRut={fetchPasajeroPorRut}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
