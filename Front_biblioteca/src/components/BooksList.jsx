// src/components/BooksList.jsx
import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import api from "../services/api";
import auth from "../stores/auth";

export default function BooksList() {
  const navigate = useNavigate();
  const [libros, setLibros] = createSignal([]);
  const [fechaLimite, setFechaLimite] = createSignal("");
  const [loading, setLoading] = createSignal(true);
  const [filtro, setFiltro] = createSignal("");

  onMount(async () => {
    try {
      const res = await api.get("/libros/");
      setLibros(res.data);
    } catch (err) {
      console.error("Error cargando libros:", err);
    } finally {
      setLoading(false);
    }
  });

  const pedirPrestamo = async (libroId, tituloLibro) => {
    if (!fechaLimite()) {
      alert(" Debes seleccionar una fecha límite");
      return;
    }
    
    try {
      await api.post("/prestamos/", {
        usuario: auth.user?.id,
        libro: libroId,
        fecha_limite: fechaLimite()
      });
      alert(` Préstamo de "${tituloLibro}" creado con éxito`);
      
      const res = await api.get("/libros/");
      setLibros(res.data);
      setFechaLimite("");
    } catch (err) {
      console.error("Error creando préstamo:", err);
      alert(" No se pudo crear el préstamo");
    }
  };

  const librosFiltrados = () => {
    return libros().filter(libro =>
      libro.titulo.toLowerCase().includes(filtro().toLowerCase()) ||
      libro.autor.toLowerCase().includes(filtro().toLowerCase()) ||
      libro.genero.toLowerCase().includes(filtro().toLowerCase())
    );
  };

  return (
    <div style={{
      "min-height": "100vh",
      "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "padding": "20px",
      "font-family": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ "max-width": "1400px", "margin": "0 auto" }}>
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
            "gap": "16px",
            "margin-bottom": "20px"
          }}>
            <h1 style={{
              "margin": "0",
              "color": "#333",
              "font-size": "32px",
              "display": "flex",
              "align-items": "center",
              "gap": "12px"
            }}>
               Catálogo de Libros
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

          {/* Buscador y selector de fecha */}
          <div style={{
            "display": "grid",
            "grid-template-columns": "1fr auto",
            "gap": "16px",
            "align-items": "end"
          }}>
            <div>
              <label style={{
                "display": "block",
                "margin-bottom": "8px",
                "color": "#555",
                "font-weight": "600"
              }}>
                 Buscar libro
              </label>
              <input
                type="text"
                placeholder="Busca por título, autor o género..."
                value={filtro()}
                onInput={(e) => setFiltro(e.target.value)}
                style={{
                  "width": "100%",
                  "padding": "12px 16px",
                  "border": "2px solid #e0e0e0",
                  "border-radius": "8px",
                  "font-size": "16px",
                  "box-sizing": "border-box"
                }}
              />
            </div>
            <div>
              <label style={{
                "display": "block",
                "margin-bottom": "8px",
                "color": "#555",
                "font-weight": "600"
              }}>
                 Fecha límite de devolución
              </label>
              <input
                type="date"
                value={fechaLimite()}
                onInput={(e) => setFechaLimite(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  "padding": "12px 16px",
                  "border": "2px solid #e0e0e0",
                  "border-radius": "8px",
                  "font-size": "16px"
                }}
              />
            </div>
          </div>
        </div>

        {/* Lista de libros */}
        {loading() ? (
          <div style={{
            "text-align": "center",
            "padding": "60px",
            "color": "white",
            "font-size": "20px"
          }}>
            ⏳ Cargando libros...
          </div>
        ) : librosFiltrados().length === 0 ? (
          <div style={{
            "background": "white",
            "padding": "60px",
            "border-radius": "16px",
            "text-align": "center",
            "color": "#666"
          }}>
            <div style={{ "font-size": "64px", "margin-bottom": "16px" }}>📚</div>
            <h3>No se encontraron libros</h3>
            <p>Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div style={{
            "display": "grid",
            "grid-template-columns": "repeat(auto-fill, minmax(320px, 1fr))",
            "gap": "24px"
          }}>
            {librosFiltrados().map((libro) => (
              <div style={{
                "background": "white",
                "border-radius": "12px",
                "box-shadow": "0 4px 15px rgba(0,0,0,0.1)",
                "overflow": "hidden",
                "transition": "all 0.3s",
                "display": "flex",
                "flex-direction": "column"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}>
                {/* Header del libro */}
                <div style={{
                  "background": libro.disponible ? 
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
                    "linear-gradient(135deg, #868e96 0%, #495057 100%)",
                  "padding": "24px",
                  "text-align": "center"
                }}>
                  <div style={{ "font-size": "48px", "margin-bottom": "8px" }}>📕</div>
                  <div style={{
                    "display": "inline-block",
                    "padding": "6px 12px",
                    "background": "rgba(255,255,255,0.25)",
                    "border-radius": "20px",
                    "color": "white",
                    "font-size": "12px",
                    "font-weight": "600"
                  }}>
                    {libro.disponible ? "✓ Disponible" : "✗ Prestado"}
                  </div>
                </div>

                {/* Contenido del libro */}
                <div style={{ "padding": "20px", "flex": "1" }}>
                  <h3 style={{
                    "margin": "0 0 8px 0",
                    "color": "#333",
                    "font-size": "20px",
                    "line-height": "1.3"
                  }}>
                    {libro.titulo}
                  </h3>
                  <p style={{
                    "margin": "0 0 16px 0",
                    "color": "#666",
                    "font-size": "14px"
                  }}>
                    <strong>Por:</strong> {libro.autor}
                  </p>

                  <div style={{
                    "display": "flex",
                    "flex-direction": "column",
                    "gap": "8px",
                    "margin-bottom": "16px",
                    "font-size": "13px",
                    "color": "#666"
                  }}>
                    <div style={{ "display": "flex", "justify-content": "space-between" }}>
                      <span><strong> Género:</strong></span>
                      <span>{libro.genero}</span>
                    </div>
                    <div style={{ "display": "flex", "justify-content": "space-between" }}>
                      <span><strong> Año:</strong></span>
                      <span>{libro.año}</span>
                    </div>
                    <div style={{ "display": "flex", "justify-content": "space-between" }}>
                      <span><strong> ISBN:</strong></span>
                      <span style={{ "font-family": "monospace", "font-size": "11px" }}>{libro.isbn}</span>
                    </div>
                  </div>
                </div>

                {/* Botón de acción */}
                <div style={{ "padding": "0 20px 20px 20px" }}>
                  {libro.disponible ? (
                    <button
                      onClick={() => pedirPrestamo(libro.id, libro.titulo)}
                      disabled={!fechaLimite()}
                      style={{
                        "width": "100%",
                        "padding": "12px",
                        "background": fechaLimite() ? 
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : 
                          "#e0e0e0",
                        "color": fechaLimite() ? "white" : "#999",
                        "border": "none",
                        "border-radius": "8px",
                        "font-weight": "600",
                        "cursor": fechaLimite() ? "pointer" : "not-allowed",
                        "transition": "all 0.3s"
                      }}
                      onMouseEnter={(e) => fechaLimite() && (e.target.style.opacity = "0.9")}
                      onMouseLeave={(e) => e.target.style.opacity = "1"}
                    >
                      {fechaLimite() ? " Solicitar Préstamo" : " Selecciona fecha primero"}
                    </button>
                  ) : (
                    <div style={{
                      "padding": "12px",
                      "background": "#f8f9fa",
                      "border-radius": "8px",
                      "text-align": "center",
                      "color": "#6c757d",
                      "font-weight": "600"
                    }}>
                       No disponible
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}