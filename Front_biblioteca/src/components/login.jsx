
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import auth from "../stores/auth";


export default function Login() {

  const navigate = useNavigate();
  const [userId, setUserId] = createSignal("");
  const [mensaje, setMensaje] = createSignal("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.login(userId());
      setMensaje(" Login exitoso");
      navigate("/menu");
    } catch (error) {
      setMensaje(" Usuario no encontrado");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>ID de Usuario</label>
          <input
            value={userId()}
            onInput={(e) => setUserId(e.target.value)}
            placeholder="Ej: 1"
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      <p>{mensaje()}</p>
    </div>
  );
}
