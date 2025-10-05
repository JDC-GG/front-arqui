
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import auth from "../stores/auth";
import { login } from "../services/api";

export default function Login() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ejemplo de login contra backend
      const userData = await login(email(), password());
      auth.setUser(userData);
      navigate("/menu");
    } catch (err) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email()}
        onInput={(e) => setEmail(e.currentTarget.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
      />
      <button type="submit">Entrar</button>
      <p>
        ¿No tienes cuenta? <a href="/register">Regístrate</a>
      </p>
    </form>
  );
}
