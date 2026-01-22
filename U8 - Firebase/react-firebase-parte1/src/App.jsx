import { app } from "./firebase/firebase";

function App() {
  const projectId = app.options.projectId;

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>React + Firebase (Parte 1)</h1>

      <p>
        <strong>Estado:</strong>{" "}
        {projectId ? "Conectado a Firebase" : "No conectado"}
      </p>

      <p>
        <strong>Project ID:</strong> {projectId || "No disponible"}
      </p>
    </div>
  );
}

export default App;
