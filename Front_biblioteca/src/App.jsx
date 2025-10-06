import { Router, Routes, Route } from "@solidjs/router";

// Componentes
import Login from "./components/Login";
import Register from "./components/Register";
import Menu from "./components/Menu";
import BooksList from "./components/BooksList";
import PrestamosList from "./components/PrestamosList";

export default function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>📚 Biblioteca</h1>

        <Routes>
          <Route path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/menu" component={Menu} />
          <Route path="/libros" component={BooksList} />
          <Route path="/prestamos" component={PrestamosList} />
        </Routes>
      </div>
    </Router>
  );
}
