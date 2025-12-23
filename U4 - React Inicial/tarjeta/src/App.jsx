import Tarjeta from './components/Tarjeta.jsx'
import './App.css'

function App() {
  return (
    <main className="contenedor">
      <h1 className="titulo">Nuestro Equipo</h1>

      <section className="grid">
        <Tarjeta
          nombre="Leonel Rodríguez"
          profesion="Alumno de Curso Fullstack"
          imagen="https://pbs.twimg.com/profile_images/1281234061357391873/a_eRlunA_400x400.jpg"
          descripcion="Me interesa construir productos digitales con foco en procesos, datos y experiencia de usuario."
        />

        <Tarjeta
          nombre="Juan Perez"
          profesion="Desarrollador"
          imagen="https://www.middlebury.edu/sites/default/files/styles/432x576/public/2019-08/big-bird-portrait_0.jpg"
          descripcion="Desarrollaor experto en React JS"
        />

        <Tarjeta
          nombre="Tomás Ramirez"
          profesion="Desarrollador Frontend"
          imagen="https://qz.com/cdn-cgi/image/width=1920,quality=85,format=auto/https://assets.qz.com/media/22199ec8c4eaf63c282feda67882c8d0.jpg"
          descripcion="Trabajo con React y buenas prácticas para construir componentes reutilizables."
        />
      </section>
    </main>
  )
}

export default App
