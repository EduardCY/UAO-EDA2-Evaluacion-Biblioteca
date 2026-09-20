import { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Prestados from "./components/Prestados";
import HistorialDevoluciones from "./components/HistorialDevoluciones";
import ColaDeEspera from "./components/ColaDeEspera";

// Nuevo componente de navegación con botones
function BotonesNavegacion() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "20px 0" }}>
      <button onClick={() => navigate("/")}>Inicio - Catálogo</button>
      <button onClick={() => navigate("/prestados")}>En préstamo</button>
      <button onClick={() => navigate("/historial")}>Devoluciones</button>
      <button onClick={() => navigate("/formulario-cola")}>Unirse a Espera</button>
      <button onClick={() => navigate("/colas")}>Listas de Espera</button>
    </div>
  );
}

function FormularioCola({ nombreUsuario, setNombreUsuario, libroSeleccionado, setLibroSeleccionado, librosDisponibles, librosPrestados, agregarACola }) {
  return (
    <section>
      <h2>Formulario para entrar a una Cola de Espera</h2>
      <form onSubmit={agregarACola}>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombreUsuario}
          onChange={e => setNombreUsuario(e.target.value)}
        />
        <select
          value={libroSeleccionado}
          onChange={e => setLibroSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un libro</option>
          {[...librosDisponibles, ...librosPrestados].map(libro => (
            <option key={libro.id} value={libro.id}>
              {libro.titulo}
            </option>
          ))}
        </select>
        <button type="submit">Entrar en Cola</button>
      </form>
    </section>
  );
}

function App() {

const [librosDisponibles, setlibrosDisponibles] = useState([
  { id: 1, titulo: "Sombras sobre Neón" },
  { id: 2, titulo: "El Último Portal" },
  { id: 3, titulo: "La Ciudad de los Sueños Rotos" },
  { id: 4, titulo: "El Bosque de los Susurros" },
  { id: 5, titulo: "Cenizas en el Vacío" },
  { id: 6, titulo: "El Trono de Huesos" },
  { id: 7, titulo: "Fragmentos de Realidad" },
  { id: 8, titulo: "La Niebla Eterna" },
  { id: 9, titulo: "El Engranaje Maldito" },
  { id: 10, titulo: "La Torre de los Ojos" },
  { id: 11, titulo: "Cánticos de Acero y Sangre" },
  { id: 12, titulo: "El Guardián del Abismo" },
  { id: 13, titulo: "Luz Muerta" },
  { id: 14, titulo: "El Pacto de las Sombras" },
  { id: 15, titulo: "La Máquina de los Lamentos" },
  { id: 16, titulo: "El Reino de la Oscuridad" },
  { id: 17, titulo: "Cosechadores de Almas" },
  { id: 18, titulo: "El Laberinto de Cristal" },
  { id: 19, titulo: "El Eco de los Condenados" },
  { id: 20, titulo: "La Marca del Vacío" }
]);

  const [librosPrestados, setlibrosPrestados] = useState([]);
  const [historialDevoluciones, setHistorialDevoluciones] = useState([]);
  const [colasEspera, setColasEspera] = useState({});
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [libroSeleccionado, setLibroSeleccionado] = useState("");
  const [nuevoLibro, setNuevoLibro] = useState("");

  const prestarLibro = (libro, usuario) => {
    setlibrosDisponibles(prev => prev.filter(l => l.id !== libro.id));
    setlibrosPrestados(prev => [...prev, { libro, usuario }]);
  };

  const devolverLibro = (libroObj) => {
    const libro = libroObj.libro || libroObj;
    const cola = colasEspera[libro.id] || [];
    if (cola.length > 0) {
      const siguienteUsuario = cola[0];
      alert(`Se ha asignado automáticamente "${libro.titulo}" a ${siguienteUsuario}.`);
      setlibrosPrestados(prev => prev.map(p =>
        p.libro.id === libro.id ? { libro, usuario: siguienteUsuario } : p
      ));
      setColasEspera(prev => ({
        ...prev,
        [libro.id]: prev[libro.id].slice(1)
      }));
      return;
    }
    setlibrosPrestados(prev => prev.filter(p => p.libro.id !== libro.id));
    setHistorialDevoluciones(prev => [...prev, libro]);
    setlibrosDisponibles(prev => [...prev, libro]);
  };

  const deshacerDevolucion = () => {
    if (historialDevoluciones.length === 0) return;
    const ultimoLibro = historialDevoluciones[historialDevoluciones.length - 1];
    setHistorialDevoluciones(prev => prev.slice(0, -1));
    setlibrosDisponibles(prev => {
      const yaExiste = prev.some(l => l.id === ultimoLibro.id);
      if (yaExiste) {
        return prev;
      } else {
        return [...prev, ultimoLibro];
      }
    });
  };

  const agregarACola = (e) => {
    e.preventDefault();
    if (!nombreUsuario || !libroSeleccionado) return;
    setColasEspera(prev => ({
      ...prev,
      [libroSeleccionado]: [...(prev[libroSeleccionado] || []), nombreUsuario]
    }));
    setNombreUsuario("");
    setLibroSeleccionado("");
  };

  const agregarLibro = (e) => {
    e.preventDefault();
    if (!nuevoLibro.trim()) return;
    setlibrosDisponibles(prev => [
      ...prev,
      { id: Date.now(), titulo: nuevoLibro }
    ]);
    setNuevoLibro("");
  };

  const eliminarColaEspera = (libroId) => {
    setColasEspera(prev => {
      const nuevo = { ...prev };
      delete nuevo[libroId];
      return nuevo;
    });
  };

  // Eliminar libro
  const eliminarLibro = (id) => {
    setlibrosDisponibles(prev => prev.filter(l => l.id !== id));
  };

  return (
    <Router>
      <div className="main-container">
        <h1>
          Biblioteca 📚
        </h1>
        <div className="botones-nav">
          <BotonesNavegacion />
        </div>
        <Routes>
          <Route path="/" element={
            <div>
              <h2>Catálogo de Libros</h2>
              <form onSubmit={agregarLibro} style={{ marginBottom: "20px" }}>
                <input
                  type="text"
                  placeholder="Nuevo libro"
                  value={nuevoLibro}
                  onChange={e => setNuevoLibro(e.target.value)}
                />
                <button type="submit">Agregar libro</button>
              </form>
              {librosDisponibles.length === 0 ? <p>No hay libros disponibles.</p> : (
                <ul>
                  {librosDisponibles.map(libro => (
                    <li key={libro.id}>
                      {libro.titulo}
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        style={{ marginLeft: '10px' }}
                        value={nombreUsuario}
                        onChange={e => setNombreUsuario(e.target.value)}
                      />
                      <button onClick={() => {
                        if (nombreUsuario.trim() !== '') {
                          prestarLibro(libro, nombreUsuario);
                          setNombreUsuario('');
                        } else {
                          alert('Ingresa tu nombre.');
                        }
                      }}>
                        Prestar
                      </button>
                      <button
                        style={{ marginLeft: '10px', color: 'red' }}
                        onClick={() => eliminarLibro(libro.id)}
                        type="button"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          } />
          <Route path="/prestados" element={
            <Prestados prestados={librosPrestados} devolverLibro={devolverLibro} />
          } />
          <Route path="/historial" element={
            <HistorialDevoluciones historial={historialDevoluciones} deshacerDevolucion={deshacerDevolucion} />
          } />
          <Route path="/formulario-cola" element={
            <FormularioCola
              nombreUsuario={nombreUsuario}
              setNombreUsuario={setNombreUsuario}
              libroSeleccionado={libroSeleccionado}
              setLibroSeleccionado={setLibroSeleccionado}
              librosDisponibles={librosDisponibles}
              librosPrestados={librosPrestados.map(p => p.libro)}
              agregarACola={agregarACola}
            />
          } />
          <Route path="/colas" element={
            <ColaDeEspera colas={colasEspera} eliminarColaEspera={eliminarColaEspera} />
          } />
        </Routes>
      </div>
    </Router>
  );

}

export default App;