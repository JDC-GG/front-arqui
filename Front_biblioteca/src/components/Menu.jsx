import { useNavigate } from "@solidjs/router";
import auth from "../stores/auth";

export default function Menu() {
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <div>
      <h2> Menú Principal</h2>
      <p>Bienvenido, {auth.user?.nombre || "Usuario"} </p>

      <div style={{ display: "flex", "flex-direction": "column", gap: "10px" }}>
        <button onClick={() => navigate("/libros")}>📖 Listar Libros</button>
        <button onClick={() => navigate("/prestamos")}>📋 Ver Préstamos</button>
        <button style={{ "background-color": "red", color: "white" }} onClick={logout}>
           Cerrar sesión
        </button>
      </div>
    </div>
  );
}
