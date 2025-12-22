const listaTareas = document.querySelector("#lista-tareas");
const estadoCarga = document.querySelector("#estado-carga");
const btnAgregar = document.querySelector("#btn-agregar");

function renderizarTareas(gestor) {
  listaTareas.innerHTML = "";

  gestor.tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.textContent = tarea.completada
      ? `${tarea.titulo}`
      : `${tarea.titulo}`;
    listaTareas.appendChild(li);
  });
}

function mostrarEstado(texto) {
  estadoCarga.textContent = texto;
}

class Tarea {
  constructor(id, titulo, completada = false) {
    this.id = id;
    this.titulo = titulo;
    this.completada = completada;
  }

  toggleEstado() {
    this.completada = !this.completada;
  }
}


class GestorTareas {
  constructor(tareasIniciales = []) {
    this.tareas = tareasIniciales;
  }

  agregarTarea(titulo) {
    const nuevoId = this._obtenerNuevoId();
    const nuevaTarea = new Tarea(nuevoId, titulo, false);
    this.tareas.push(nuevaTarea);
    renderizarTareas(this);
    return nuevaTarea;
  }

  listarTareas() {
    console.log("📋 Listado de tareas:");
    this.tareas.forEach((tarea) => {
      const estado = tarea.completada ? "✅ Completada" : "⏳ Pendiente";
      console.log(`- [${tarea.id}] ${tarea.titulo} (${estado})`);
    });
  }

  buscarPorTitulo(titulo) {
    return this.tareas.find(
      (tarea) => tarea.titulo.toLowerCase() === titulo.toLowerCase()
    );
  }

  listarCompletadas() {
    return this.tareas.filter((tarea) => tarea.completada);
  }

  obtenerTitulos() {
    return this.tareas.map((tarea) => tarea.titulo);
  }

  _obtenerNuevoId() {
    if (this.tareas.length === 0) return 1;
    const ids = this.tareas.map((tarea) => tarea.id);
    return Math.max(...ids) + 1;
  }
}


function cargarTareas() {
  return new Promise((resolve) => {
    console.log("⏳ Cargando tareas iniciales...");
    setTimeout(() => {
      const tareasIniciales = [
        new Tarea(1, "Preparar diapositivas del curso", true),
        new Tarea(2, "Revisar apuntes de JavaScript", false),
        new Tarea(3, "Subir ejercicios a GitHub", false),
      ];
      resolve(tareasIniciales);
    }, 2000);
  });
}

function cargarUsuarios() {
  return new Promise((resolve) => {
    console.log(" Cargando usuarios relacionados...");
    setTimeout(() => {
      const usuarios = [
        { id: 1, nombre: "Leonel" },
        { id: 2, nombre: "Ana" },
      ];
      resolve(usuarios);
    }, 1500);
  });
}

async function main() {
  try {
    mostrarEstado("Cargando tareas...");
    console.log(" Iniciando gestor de tareas...");

    const [tareasIniciales, usuarios] = await Promise.all([
      cargarTareas(),
      cargarUsuarios(),
    ]);

    const gestor = new GestorTareas(tareasIniciales);

    mostrarEstado("Tareas cargadas");
    console.log(" Usuarios cargados:", usuarios);

    gestor.listarTareas();
    renderizarTareas(gestor);

    btnAgregar.addEventListener("click", () => {
      gestor.agregarTarea("Nueva tarea de ejemplo");
      mostrarEstado("Tarea agregada");
      gestor.listarTareas();
    });

    const tareaEncontrada = gestor.buscarPorTitulo(
      "Revisar apuntes de JavaScript"
    );
    if (tareaEncontrada) {
      tareaEncontrada.toggleEstado();
    }

    const tareasCompletadas = gestor.listarCompletadas();
    console.log("\n Completadas:", tareasCompletadas);

    console.log("\n Titulos (map):", gestor.obtenerTitulos());

  } catch (error) {
    console.error(" Error:", error);
  }
}

main();
