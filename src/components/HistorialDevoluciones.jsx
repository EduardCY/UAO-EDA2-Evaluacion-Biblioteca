function HistorialDevoluciones({ historial, deshacerDevolucion }) {
  return (
    <div>
      <h2>📜 Historial de Devoluciones</h2>
      {historial.length === 0 ? (
        <p>No hay devoluciones recientes.</p>
      ) : (
        <>
          <ul>
            {historial.map((libro, idx) => (
              <li key={idx}>{libro.titulo}</li>
            ))}
          </ul>
          <button onClick={deshacerDevolucion}>Deshacer última devolución</button>
        </>
      )}
    </div>
  );
}

export default HistorialDevoluciones;
