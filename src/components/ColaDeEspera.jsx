import { useState } from 'react';

function ColaDeEspera({ colas, eliminarColaEspera }) {
  return (
    <div>
      <h2>🚶‍♂️🚶‍♀️ Colas de Espera</h2>
      {Object.keys(colas).length === 0 ? (
        <p>No hay colas de espera.</p>
      ) : (
        Object.entries(colas).map(([libroId, usuarios]) => (
          <div key={libroId}>
            <h4>Libro ID {libroId}</h4>
            <ul>
              {usuarios.map((usuario, idx) => (
                <li key={idx}>{usuario}</li>
              ))}
            </ul>
            <button
              type="button"
              style={{ background: "#f6c1c7", color: "#111", marginBottom: 16 }}
              onClick={() => eliminarColaEspera(libroId)}
            >
              Eliminar Cola
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ColaDeEspera;
