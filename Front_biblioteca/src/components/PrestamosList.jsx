// src/components/PrestamosList.jsx
import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import api from "../services/api";
import auth from "../stores/auth";

export default function PrestamosList() {
  const navigate = useNavigate();
  const [prestamos, setPrestamos] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const res = await api.get("/prestamos/");
      setPrestamos(res.data);
    } catch (err) {
      console.error("Error cargando préstamos", err);
    } finally {
      setLoading(false);
    }
  });

  const devolver = async (prestamoId, tituloLibro) => {
    if (!confirm(`¿Confirmar devolución de "${tituloLibro}"?`)) {
      return;
    }

    try {
      await api.post(`/prestamos/${prestamoId}/return/`);
      const res = await api.get("/prestamos/");
      setPrestamos(res.data);
      alert(` Libro "${tituloLibro}" devuelto correctamente`);
    } catch (err) {
      console.error("Error devolviendo préstamo", err);
      alert(" Error al devolver el libro");
    }
  };

  const misPrestamos = () => {
    return prestamos().filter((p) => p.usuario === auth.user?.id);
  };

  const prestamosActivos = () => misPrestamos().filter(p => !p.devuelto);
  const prestamosDevueltos = () => misPrestamos().filter(p => p.devuelto);

  const calcularDiasRestantes = (fechaLimite) => {
    const hoy = new Date();
    const limite = new Date(fechaLimite);
    const diff = Math.ceil((limite - hoy) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getEstadoColor = (diasRestantes) => {
    if (diasRestantes < 0) return "#dc3545"; // Rojo - atrasado
    if (diasRestantes <= 3) return "#ffc107"; // Amarillo - próximo a vencer
    return "#28a745"; // Verde - tiempo suficiente
  };

  return (
    <div style={{
      "min-height": "100vh",
      "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "padding": "20px",
      "font-family": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ "max-width": "1200px", "margin": "0 auto" }}>
        {/* Header */}
        <div style={{
          "background": "white",
          "padding": "24px",
          "border-radius": "16px",
          "box-shadow": "0 10px 30px rgba(0,0,0,0.2)",
          "margin-bottom": "30px"
        }}>
          <div style={{
            "display": "flex",
            "justify-content": "space-between",
            "align-items": "center",
            "flex-wrap": "wrap",
            "gap": "16px"
          }}>
            <h1 style={{
              "margin": "0",
              "color": "#333",
              "font-size": "32px",
              "display": "flex",
              "align-items": "center",
              "gap": "12px"
            }}>
               Mis Préstamos
            </h1>
            <button
              onClick={() => navigate("/menu")}
              style={{
                "padding": "10px 20px",
                "background": "#6c757d",
                "color": "white",
                "border": "none",
                "border-radius": "8px",
                "cursor": "pointer",
                "font-weight": "600"
              }}
            >
              ← Volver al Menú
            </button>
          </div>

          {/* Estadísticas */}
          <div style={{
            "display": "grid",
            "grid-template-columns": "repeat(auto-fit, minmax(200px, 1fr))",
            "gap": "16px",
            "margin-top": "20px"
          }}>
            <div style={{
              "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "padding": "16px",
              "border-radius": "12px",
              "color": "white",
              "text-align": "center"
            }}>
              <div style={{ "font-size": "32px", "font-weight": "bold" }}>
                {prestamosActivos().length}
              </div>
              <div style={{ "font-size": "14px", "opacity": "0.9" }}>Préstamos Activos</div>
            </div>
            <div style={{
              "background": "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
              "padding": "16px",
              "border-radius": "12px",
              "color": "white",
              "text-align": "center"
            }}>
              <div style={{ "font-size": "32px", "font-weight": "bold" }}>
                {prestamosDevueltos().length}
              </div>
              <div style={{ "font-size": "14px", "opacity": "0.9" }}>Libros Devueltos</div>
            </div>
          </div>
        </div>

        {loading() ? (
          <div style={{
            "text-align": "center",
            "padding": "60px",
            "color": "white",
            "font-size": "20px"
          }}>
             Cargando préstamos...
          </div>
        ) : misPrestamos().length === 0 ? (
          <div style={{
            "background": "white",
            "padding": "60px",
            "border-radius": "16px",
            "text-align": "center",
            "box-shadow": "0 10px 30px rgba(0,0,0,0.2)"
          }}>
            <div style={{ "font-size": "64px", "margin-bottom": "16px" }}></div>
            <h3 style={{ "color": "#333", "margin": "0 0 8px 0" }}>No tienes préstamos</h3>
            <p style={{ "color": "#666", "margin": "0 0 24px 0" }}>
              Explora nuestro catálogo y solicita tu primer libro
            </p>
            <button
              onClick={() => navigate("/libros")}
              style={{
                "padding": "12px 24px",
                "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "color": "white",
                "border": "none",
                "border-radius": "8px",
                "font-weight": "600",
                "cursor": "pointer"
              }}
            >
              Ver Catálogo de Libros
            </button>
          </div>
        ) : (
          <>
            {/* Préstamos Activos */}
            {prestamosActivos().length > 0 && (
              <div style={{ "margin-bottom": "30px" }}>
                <h2 style={{
                  "color": "white",
                  "margin": "0 0 16px 0",
                  "font-size": "24px"
                }}>
                   Préstamos Activos
                </h2>
                <div style={{
                  "display": "grid",
                  "gap": "16px"
                }}>
                  {prestamosActivos().map((p) => {
                    const diasRestantes = calcularDiasRestantes(p.fecha_limite);
                    const estadoColor = getEstadoColor(diasRestantes);
                    
                    return (
                      <div style={{
                        "background": "white",
                        "border-radius": "12px",
                        "padding": "24px",
                        "box-shadow": "0 4px 15px rgba(0,0,0,0.1)",
                        "border-left": `6px solid ${estadoColor}`,
                        "display": "grid",
                        "grid-template-columns": "1fr auto",
                        "gap": "20px",
                        "align-items": "center"
                      }}>
                        <div>
                          <h3 style={{
                            "margin": "0 0 12px 0",
                            "color": "#333",
                            "font-size": "20px",
                            "display": "flex",
                            "align-items": "center",
                            "gap": "8px"
                          }}>
                             {p.libro?.titulo || "Sin título"}
                          </h3>
                          
                          <div style={{
                            "display": "grid",
                            "grid-template-columns": "repeat(auto-fit, minmax(200px, 1fr))",
                            "gap": "12px",
                            "font-size": "14px",
                            "color": "#666"
                          }}>
                            <div>
                              <strong> Autor:</strong> {p.libro?.autor || "Desconocido"}
                            </div>
                            <div>
                              <strong> Fecha límite:</strong> {p.fecha_limite}
                            </div>
                            <div style={{ "color": estadoColor, "font-weight": "600" }}>
                              {diasRestantes < 0 ? 
                                `⚠️ Atrasado ${Math.abs(diasRestantes)} días` :
                                diasRestantes === 0 ?
                                ` Vence hoy` :
                                ` ${diasRestantes} día${diasRestantes !== 1 ? 's' : ''} restante${diasRestantes !== 1 ? 's' : ''}`
                              }
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => devolver(p.id, p.libro?.titulo)}
                          style={{
                            "padding": "12px 24px",
                            "background": "#28a745",
                            "color": "white",
                            "border": "none",
                            "border-radius": "8px",
                            "font-weight": "600",
                            "cursor": "pointer",
                            "white-space": "nowrap",
                            "transition": "all 0.3s"
                          }}
                          onMouseEnter={(e) => e.target.style.background = "#218838"}
                          onMouseLeave={(e) => e.target.style.background = "#28a745"}
                        >
                          ✓ Devolver
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Préstamos Devueltos */}
            {prestamosDevueltos().length > 0 && (
              <div>
                <h2 style={{
                  "color": "white",
                  "margin": "0 0 16px 0",
                  "font-size": "24px"
                }}>
                   Historial de Devoluciones
                </h2>
                <div style={{
                  "display": "grid",
                  "gap": "16px"
                }}>
                  {prestamosDevueltos().map((p) => (
                    <div style={{
                      "background": "white",
                      "border-radius": "12px",
                      "padding": "20px",
                      "box-shadow": "0 4px 15px rgba(0,0,0,0.1)",
                      "opacity": "0.8"
                    }}>
                      <h3 style={{
                        "margin": "0 0 12px 0",
                        "color": "#333",
                        "font-size": "18px"
                      }}>
                        📕 {p.libro?.titulo || "Sin título"}
                      </h3>
                      
                      <div style={{
                        "display": "grid",
                        "grid-template-columns": "repeat(auto-fit, minmax(200px, 1fr))",
                        "gap": "12px",
                        "font-size": "13px",
                        "color": "#666"
                      }}>
                        <div>
                          <strong> Fecha límite:</strong> {p.fecha_limite}
                        </div>
                        <div style={{ "color": "#28a745" }}>
                          <strong>✓ Devuelto:</strong> {p.fecha_devolucion}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}