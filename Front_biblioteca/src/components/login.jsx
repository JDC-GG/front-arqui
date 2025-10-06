// src/components/Login.jsx
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import auth from "../stores/auth";

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = createSignal("");
  const [mensaje, setMensaje] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    
    try {
      await auth.login(userId());
      setMensaje(" Login exitoso");
      setTimeout(() => navigate("/menu"), 500);
    } catch (error) {
      setMensaje(" Usuario no encontrado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      "min-height": "100vh",
      "display": "flex",
      "align-items": "center",
      "justify-content": "center",
      "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "font-family": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        "background": "white",
        "padding": "40px",
        "border-radius": "16px",
        "box-shadow": "0 20px 60px rgba(0,0,0,0.3)",
        "width": "100%",
        "max-width": "400px"
      }}>
        <div style={{ "text-align": "center", "margin-bottom": "30px" }}>
          <div style={{ "font-size": "64px", "margin-bottom": "10px" }}></div>
          <h2 style={{ "margin": "0", "color": "#333", "font-size": "28px" }}>Biblioteca Virtual</h2>
          <p style={{ "color": "#666", "margin-top": "8px" }}>Ingresa a tu cuenta</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ "margin-bottom": "20px" }}>
            <label style={{
              "display": "block",
              "margin-bottom": "8px",
              "color": "#555",
              "font-weight": "600"
            }}>
              ID de Usuario
            </label>
            <input
              type="text"
              value={userId()}
              onInput={(e) => setUserId(e.target.value)}
              placeholder="Ejemplo: 1"
              required
              style={{
                "width": "100%",
                "padding": "12px 16px",
                "border": "2px solid #e0e0e0",
                "border-radius": "8px",
                "font-size": "16px",
                "transition": "border-color 0.3s",
                "box-sizing": "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          <button
            type="submit"
            disabled={loading()}
            style={{
              "width": "100%",
              "padding": "14px",
              "background": loading() ? "#999" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "color": "white",
              "border": "none",
              "border-radius": "8px",
              "font-size": "16px",
              "font-weight": "600",
              "cursor": loading() ? "not-allowed" : "pointer",
              "transition": "transform 0.2s",
              "margin-bottom": "16px"
            }}
            onMouseEnter={(e) => !loading() && (e.target.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            {loading() ? "Ingresando..." : "Ingresar"}
          </button>

          {mensaje() && (
            <div style={{
              "padding": "12px",
              "border-radius": "8px",
              "background": mensaje().includes("✅") ? "#d4edda" : "#f8d7da",
              "color": mensaje().includes("✅") ? "#155724" : "#721c24",
              "text-align": "center",
              "margin-bottom": "16px"
            }}>
              {mensaje()}
            </div>
          )}

          <div style={{
            "text-align": "center",
            "padding-top": "16px",
            "border-top": "1px solid #e0e0e0"
          }}>
            <p style={{ "color": "#666", "margin": "0 0 8px 0" }}>¿No tienes cuenta?</p>
            <button
              type="button"
              onClick={() => navigate("/register")}
              style={{
                "background": "transparent",
                "border": "none",
                "color": "#667eea",
                "font-weight": "600",
                "cursor": "pointer",
                "text-decoration": "underline"
              }}
            >
              Registrarse aquí
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}