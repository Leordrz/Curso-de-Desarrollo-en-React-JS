const form = document.querySelector("#registro");
const inputNombre = document.querySelector("#nombre");
const inputEdad = document.querySelector("#edad");
const mensaje = document.querySelector("#mensaje");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const asistente = {
    nombre: inputNombre.value,
    edad: Number(inputEdad.value)
  }

  if (asistente.edad >= 18) {
    mensaje.textContent = `✅ Felicitaciones ${asistente.nombre}, ya estás registrado al evento.`;
    mensaje.classList.remove("error");
    mensaje.classList.add("exito");
  } else {
    mensaje.textContent = `❌ Lo sentimos ${asistente.nombre}, debés ser mayor de edad para participar.`;
    mensaje.classList.remove("exito");
    mensaje.classList.add("error");
  }
});
