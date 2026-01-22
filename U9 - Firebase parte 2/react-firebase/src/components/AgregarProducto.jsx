import { useState } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

function AgregarProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const agregarProducto = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "productos"), {
      nombre,
      precio: Number(precio),
      stock: Number(stock),
      favorito: false,
    });

    setNombre("");
    setPrecio("");
    setStock("");
  };

  const crearProductoDemo = async () => {
    await setDoc(doc(db, "productos", "demo"), {
      nombre: "Demo",
      precio: 1,
      stock: 100,
      favorito: false,
    });
  };

  return (
    <div>
      <h2>Agregar productos</h2>

      <form onSubmit={agregarProducto}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button>Agregar</button>
      </form>

      <div className="demo-btn">
        <button type="button" onClick={crearProductoDemo}>
          Crear producto DEMO
        </button>
      </div>

      <hr />
    </div>
  );
}

export default AgregarProducto;
