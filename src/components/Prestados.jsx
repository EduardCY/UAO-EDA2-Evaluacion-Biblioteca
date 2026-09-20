function Prestados({ prestados, devolverLibro }) {
    return (
      <div>
        <h2>📚 Libros Prestados</h2>
        {prestados.length === 0 ? (
          <p>No hay libros prestados.</p>
        ) : (
          <ul>
            {prestados.map((p, idx) => (
              <li key={idx}>
                "{p.libro.titulo}" prestado a <strong>{p.usuario}</strong>
                <button onClick={() => devolverLibro(p.libro)} style={{ marginLeft: '10px' }}>
                  Devolver
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  export default Prestados;
  