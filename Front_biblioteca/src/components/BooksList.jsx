import { createSignal, onMount } from "solid-js";
import api from "../services/api";
import auth from "../stores/auth";

export default function BooksList() {
  const [libros, setLibros] = createSignal([]);
  const [fechaLimite, setFechaLimite] = createSignal("");

  // Cargar todos los libros al montar
  onMount(async () => {
    try {
      const res = await api.get("/libros/");
      setLibros(res.data);
    } catch (err) {
      console.error("Error cargando libros:", err);
    }
  });

  // Función para pedir préstamo
  const pedirPrestamo = async (libroId) => {
    if (!fechaLimite()) {
      alert("Debes seleccionar una fecha límite ");
      return;
    }
    try {
      await api.post("/prestamos/", {
        usuario: auth.user?.id,  // según tu modelo en backend
        libro: libroId,
        fecha_limite: fechaLimite()
      });
      alert(" Préstamo creado con éxito");
      // recargar lista de libros
      const res = await api.get("/libros/");
      setLibros(res.data);
    } catch (err) {
      console.error("Error creando préstamo:", err);
      alert(" No se pudo crear el préstamo");
    }
  };

  return (
    <div>
      <h2>📖 Lista de Libros</h2>

      <label>
        Selecciona fecha límite para el préstamo:{" "}
        <input type="date" value={fechaLimite()} onInput={(e) => setFechaLimite(e.target.value)} />
      </label>

      <ul>
        {libros().map((libro) => (
          <li>
            <strong>{libro.titulo}</strong> – {libro.autor}  
            {libro.disponible ? (
              <button onClick={() => pedirPrestamo(libro.id)}> Pedir Préstamo</button>
            ) : (
              <span style={{ color: "red" }}>No disponible</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
