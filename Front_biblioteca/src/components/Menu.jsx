import { useNavigate } from "@solidjs/router";
import auth from "../stores/auth";

export default function Menu() {
const navigate = useNavigate();

const handleLogout = () => {
    auth.clearUser();
    navigate("/login");
};

return (
    <div style={{ padding: "2rem" }}>
<h2>Bienvenido, {auth.user?.name || "Usuario"}</h2>

<div style={{ margin: "1rem 0" }}>
        <button onClick={() => navigate("/libros")} style={{ marginRight: "1rem" }}>
Listar Libros
        </button>
        <button onClick={() => navigate("/prestamos")}>
Préstamos Activos
        </button>
</div>

<button onClick={handleLogout} style={{ marginTop: "2rem", color: "red" }}>
        Cerrar Sesión
</button>
    </div>
);
}
