import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import auth from "../stores/auth";


export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = createSignal("");
  const [correo, setCorreo] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [mensaje, setMensaje] = createSignal("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.register({
        nombre: nombre(),
        correo: correo(),
        password: password(),
      });
      setMensaje(" Usuario registrado con éxito");
      navigate("/menu"); // después de registrar, va al menú
    } catch (error) {
      setMensaje(" Error al registrar usuario");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input value={nombre()} onInput={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label>Correo</label>
          <input value={correo()} onInput={(e) => setCorreo(e.target.value)} />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <p>{mensaje()}</p>
    </div>
  );
}
