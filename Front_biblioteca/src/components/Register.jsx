import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import auth from "../stores/auth";
import { register } from "../services/api";

export default function Register() {
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamada al backend
      const userData = await register({
        name: name(),
        email: email(),
        password: password(),
      });

      // Guardamos al usuario en el store
      auth.setUser(userData);

      // Redirigimos al menú
      navigate("/menu");
    } catch (err) {
      console.error(err);
      alert("Error al registrarse");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name()}
        onInput={(e) => setName(e.currentTarget.value)}
      />
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
      <button type="submit">Crear cuenta</button>

      <p>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </form>
  );
}

