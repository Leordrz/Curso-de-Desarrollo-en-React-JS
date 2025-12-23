import './Tarjeta.css'

function Tarjeta({nombre, profesion, imagen, descripcion }) {
  return (
    <article className="tarjeta">
      <img className="tarjeta__img" src={imagen} alt={`Foto de ${nombre}`} />
      <h2 className="tarjeta__nombre">{nombre}</h2>
      <h3 className="tarjeta__profesion">{profesion}</h3>
      <p className="tarjeta__descripcion">{descripcion}</p>
    </article>
  )
}

export default Tarjeta
