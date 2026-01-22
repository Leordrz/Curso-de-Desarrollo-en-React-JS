import { app } from "./firebase/firebase";
import AgregarProducto from "./components/AgregarProducto";
import ListaProductos from "./components/ListaProductos";

function App() {
  const projectId = app.options.projectId;
  const conectado = Boolean(projectId);

  return (
    <div className="app">
      <header>
        <h1>Inventario</h1>
        <small style={{ color: conectado ? "green" : "red" }}>
          {conectado
            ? "Firebase conectado correctamente"
            : "Firebase no conectado"}
        </small>
      </header>

      <AgregarProducto />
      <hr />
      <ListaProductos />
    </div>
  );
}

export default App;
