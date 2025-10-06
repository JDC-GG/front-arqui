import { Router, Route } from "@solidjs/router";

// Componentes
import Login from "./components/login";
import Register from "./components/Register";
import Menu from "./components/Menu";
import BooksList from "./components/BooksList";
import PrestamosList from "./components/PrestamosList";

export default function App() {
  return (
    <Router>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/menu" component={Menu} />
      <Route path="/libros" component={BooksList} />
      <Route path="/prestamos" component={PrestamosList} />
    </Router>
  );
}