import { createSignal, onMount } from "solid-js";
import api from "../services/api";
import auth from "../stores/auth";

export default function PrestamosList() {
  const [prestamos, setPrestamos] = createSignal([]);

  // Cargar préstamos al montar
  onMount(async () => {
    try {
      const res = await api.get("/prestamos/");
      setPrestamos(res.data);
    } catch (err) {
      console.error("Error cargando préstamos", err);
    }
  });

  // Devolver libro
  const devolver = async (prestamoId) => {
    try {
      await api.post(`/prestamos/${prestamoId}/return/`);
      // Refrescar lista después de devolver
      const res = await api.get("/prestamos/");
      setPrestamos(res.data);
    } catch (err) {
      console.error("Error devolviendo préstamo", err);
    }
  };

  return (
    <div>
      <h2>📋 Mis Préstamos</h2>
      {prestamos().length === 0 ? (
        <p>No tienes préstamos aún.</p>
      ) : (
        <table border="1" cellpadding="8">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Fecha Límite</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {prestamos()
              .filter((p) => p.usuario === auth.user?.id) // solo préstamos del usuario logueado
              .map((p) => (
                <tr>
                  <td>{p.libro?.titulo || "Sin título"}</td>
                  <td>{p.fecha_limite}</td>
                  <td>{p.devuelto ? " Devuelto" : " Activo"}</td>
                  <td>
                    {!p.devuelto ? (
                      <button onClick={() => devolver(p.id)}>Devolver</button>
                    ) : (
                      <small> Devuelto: {p.fecha_devolucion}</small>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
