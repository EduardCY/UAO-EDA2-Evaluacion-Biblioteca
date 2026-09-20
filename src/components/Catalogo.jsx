import { useState } from 'react';

function Catalogo({ catalogo, prestarLibro }) {
  const [usuarios, setUsuarios] = useState({});

  const handleChange = (id, value) => {
    setUsuarios(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div>
      <h2>📖 Catálogo de Libros</h2>
      {catalogo.length === 0 ? (
        <p>No hay libros disponibles.</p>
      ) : (
        <ul>
          {catalogo.map(libro => (
            <li key={libro.id}>
              {libro.titulo}
              <input
                type="text"
                placeholder="Tu nombre"
                value={usuarios[libro.id] || ''}
                onChange={(e) => handleChange(libro.id, e.target.value)}
                style={{ marginLeft: '10px' }}
              />
              <button onClick={() => {
                if ((usuarios[libro.id] || '').trim() !== '') {
                  prestarLibro(libro, usuarios[libro.id]);
                  setUsuarios(prev => ({ ...prev, [libro.id]: '' }));
                } else {
                  alert('Ingresa tu nombre.');
                }
              }}>
                Prestar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Catalogo;
