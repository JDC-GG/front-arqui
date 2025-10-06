// src/components/Menu.jsx
import { useNavigate } from "@solidjs/router";
import auth from "../stores/auth";

export default function Menu() {
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <div style={{
      "min-height": "100vh",
      "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "padding": "20px",
      "font-family": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        "max-width": "1200px",
        "margin": "0 auto"
      }}>
        {/* Header */}
        <div style={{
          "background": "white",
          "padding": "24px",
          "border-radius": "16px",
          "box-shadow": "0 10px 30px rgba(0,0,0,0.2)",
          "margin-bottom": "30px",
          "display": "flex",
          "justify-content": "space-between",
          "align-items": "center",
          "flex-wrap": "wrap",
          "gap": "16px"
        }}>
          <div>
            <h1 style={{
              "margin": "0 0 8px 0",
              "color": "#333",
              "font-size": "32px",
              "display": "flex",
              "align-items": "center",
              "gap": "12px"
            }}>
              📚 Biblioteca Virtual
            </h1>
            <p style={{
              "margin": "0",
              "color": "#666",
              "font-size": "16px"
            }}>
              Bienvenido, <strong>{auth.user?.nombre || "Usuario"}</strong> 👋
            </p>
          </div>
          <button
            onClick={logout}
            style={{
              "padding": "12px 24px",
              "background": "#dc3545",
              "color": "white",
              "border": "none",
              "border-radius": "8px",
              "font-size": "14px",
              "font-weight": "600",
              "cursor": "pointer",
              "transition": "all 0.3s",
              "display": "flex",
              "align-items": "center",
              "gap": "8px"
            }}
            onMouseEnter={(e) => e.target.style.background = "#c82333"}
            onMouseLeave={(e) => e.target.style.background = "#dc3545"}
          >
            🚪 Cerrar Sesión
          </button>
        </div>

        {/* Menú de opciones */}
        <div style={{
          "display": "grid",
          "grid-template-columns": "repeat(auto-fit, minmax(280px, 1fr))",
          "gap": "24px"
        }}>
          {/* Card: Libros */}
          <div
            onClick={() => navigate("/libros")}
            style={{
              "background": "white",
              "padding": "32px",
              "border-radius": "16px",
              "box-shadow": "0 10px 30px rgba(0,0,0,0.2)",
              "cursor": "pointer",
              "transition": "all 0.3s",
              "text-align": "center"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
            }}
          >
            <div style={{ "font-size": "64px", "margin-bottom": "16px" }}>📖</div>
            <h2 style={{ "margin": "0 0 12px 0", "color": "#333", "font-size": "24px" }}>
              Explorar Libros
            </h2>
            <p style={{ "color": "#666", "margin": "0", "font-size": "14px" }}>
              Navega por nuestra colección y solicita préstamos
            </p>
          </div>

          {/* Card: Préstamos */}
          <div
            onClick={() => navigate("/prestamos")}
            style={{
              "background": "white",
              "padding": "32px",
              "border-radius": "16px",
              "box-shadow": "0 10px 30px rgba(0,0,0,0.2)",
              "cursor": "pointer",
              "transition": "all 0.3s",
              "text-align": "center"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
            }}
          >
            <div style={{ "font-size": "64px", "margin-bottom": "16px" }}>📋</div>
            <h2 style={{ "margin": "0 0 12px 0", "color": "#333", "font-size": "24px" }}>
              Mis Préstamos
            </h2>
            <p style={{ "color": "#666", "margin": "0", "font-size": "14px" }}>
              Revisa tus libros prestados y fechas de devolución
            </p>
          </div>
        </div>

        {/* Info adicional */}
        <div style={{
          "background": "rgba(255,255,255,0.95)",
          "padding": "24px",
          "border-radius": "16px",
          "margin-top": "30px",
          "box-shadow": "0 10px 30px rgba(0,0,0,0.2)"
        }}>
          <h3 style={{ "margin": "0 0 16px 0", "color": "#333" }}>📌 Información Importante</h3>
          <ul style={{ "margin": "0", "padding-left": "24px", "color": "#666", "line-height": "1.8" }}>
            <li>Puedes tener hasta <strong>3 libros</strong> prestados simultáneamente</li>
            <li>El período de préstamo es de <strong>14 días</strong></li>
            <li>Recuerda devolver los libros a tiempo para evitar sanciones</li>
            <li>Puedes renovar un préstamo si el libro no tiene reservas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}