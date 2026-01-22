import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firestore";

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({ nombre: "", precio: "", stock: "" });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
      const arr = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProductos(arr);
    });

    return () => unsubscribe();
  }, []);

  const comenzarEdicion = (p) => {
    setEditandoId(p.id);
    setForm({ nombre: p.nombre, precio: p.precio, stock: p.stock });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm({ nombre: "", precio: "", stock: "" });
  };

  const guardarCambios = async () => {
    await updateDoc(doc(db, "productos", editandoId), {
      nombre: form.nombre,
      precio: Number(form.precio),
      stock: Number(form.stock),
    });
    cancelarEdicion();
  };

 
  const toggleFavorito = async (p) => {
    await setDoc(
      doc(db, "productos", p.id),
      { favorito: !Boolean(p.favorito) },
      { merge: true }
    );
  };

  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
  };

  return (
    <div>
      <h2>Lista de productos</h2>

      {productos.map((p) => (
        <div key={p.id} className="producto">
          {editandoId !== p.id && (
            <>
              <div className="linea">
                <strong className={p.favorito ? "favorito" : ""}>
                  {p.favorito ? "★ " : ""}
                  {p.nombre}
                </strong>{" "}
                — ${p.precio} — Stock: {p.stock}
              </div>

              <div className="acciones">
                <button onClick={() => comenzarEdicion(p)}>Editar</button>
                <button onClick={() => toggleFavorito(p)}>
                  {p.favorito ? "Quitar favorito" : "Marcar favorito"}
                </button>
                <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
              </div>
            </>
          )}

          {editandoId === p.id && (
            <div className="edicion">
              <div className="inputs">
                <input
                  value={form.nombre}
                  onChange={(e) =>
                    setForm({ ...form, nombre: e.target.value })
                  }
                />

                <input
                  type="number"
                  value={form.precio}
                  onChange={(e) =>
                    setForm({ ...form, precio: e.target.value })
                  }
                />

                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) =>
                    setForm({ ...form, stock: e.target.value })
                  }
                />
              </div>

              <div className="acciones">
                <button onClick={guardarCambios}>Guardar</button>
                <button onClick={cancelarEdicion}>Cancelar</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListaProductos;
