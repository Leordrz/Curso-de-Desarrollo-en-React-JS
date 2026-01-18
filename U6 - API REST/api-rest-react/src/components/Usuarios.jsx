import { useEffect, useState } from "react";
import UsuarioCard from "./usuarioCard.jsx";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);     
  const [loading, setLoading] = useState(true);     
  const [error, setError] = useState(null);         
  const [busqueda, setBusqueda] = useState("");     
  const [contadorRecarga, setContadorRecarga] = useState(0); 

  useEffect(() => {
    async function traerUsuarios() {
        try {
            setLoading(true);
            setError(null);
            const usrs = await fetch(API_URL);

            if (!usrs.ok) {
            throw new Error("Error al traer usuarios");
            }

            const data = await usrs.json();
            setUsuarios(data);
        } 

        catch (e) {
            setError(e.message);
        } 
        
        finally {
            setLoading(false);
        }
    }
    traerUsuarios();
  }, 
  [contadorRecarga]);

  const usuariosFiltrados = usuarios.filter((u) =>
    u.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button onClick={() => setContadorRecarga(contadorRecarga + 1)}>
        Recargar
      </button>

      <ul>
        {usuariosFiltrados.map((usuario) => (
          <li key={usuario.id}>
            <UsuarioCard usuario={usuario} />
          </li>
        ))}
      </ul>
    </div>
  );
}
