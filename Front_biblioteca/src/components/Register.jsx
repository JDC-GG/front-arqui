// src/components/Register.jsx
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import auth from "../stores/auth";

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = createSignal("");
  const [correo, setCorreo] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [mensaje, setMensaje] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    
    try {
      await auth.register({
        nombre: nombre(),
        correo: correo(),
        password: password(),
      });
      setMensaje("✅ Usuario registrado con éxito");
      setTimeout(() => navigate("/menu"), 800);
    } catch (error) {
      setMensaje("❌ Error al registrar usuario");
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
      "font-family": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      "padding": "20px"
    }}>
      <div style={{
        "background": "white",
        "padding": "40px",
        "border-radius": "16px",
        "box-shadow": "0 20px 60px rgba(0,0,0,0.3)",
        "width": "100%",
        "max-width": "450px"
      }}>
        <div style={{ "text-align": "center", "margin-bottom": "30px" }}>
          <div style={{ "font-size": "64px", "margin-bottom": "10px" }}>👤</div>
          <h2 style={{ "margin": "0", "color": "#333", "font-size": "28px" }}>Crear Cuenta</h2>
          <p style={{ "color": "#666", "margin-top": "8px" }}>Únete a nuestra biblioteca</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ "margin-bottom": "20px" }}>
            <label style={{
              "display": "block",
              "margin-bottom": "8px",
              "color": "#555",
              "font-weight": "600"
            }}>
              Nombre Completo
            </label>
            <input
              type="text"
              value={nombre()}
              onInput={(e) => setNombre(e.target.value)}
              placeholder="Ej: Juan Pérez"
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

          <div style={{ "margin-bottom": "20px" }}>
            <label style={{
              "display": "block",
              "margin-bottom": "8px",
              "color": "#555",
              "font-weight": "600"
            }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              value={correo()}
              onInput={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
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

          <div style={{ "margin-bottom": "24px" }}>
            <label style={{
              "display": "block",
              "margin-bottom": "8px",
              "color": "#555",
              "font-weight": "600"
            }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              minLength="6"
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
            {loading() ? "Registrando..." : "Crear Cuenta"}
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
            <p style={{ "color": "#666", "margin": "0 0 8px 0" }}>¿Ya tienes cuenta?</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{
                "background": "transparent",
                "border": "none",
                "color": "#667eea",
                "font-weight": "600",
                "cursor": "pointer",
                "text-decoration": "underline"
              }}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}