export function horaCorta() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function siguienteId(chats) {
  if (!Array.isArray(chats) || chats.length === 0) return 1;
  return Math.max(...chats.map((c) => c.id)) + 1;
}

export function normalizarNombre(nombre) {
  if (!nombre) return "";
  return nombre.trim().replace(/\s+/g, " ");
}

const RESPUESTAS_RANDOM = [
  "Estoy ocupado.",
  "No seas así.",
  "Puedo cambiar.",
  "No sos vos, soy yo.",
  "Siempre lo mismo...",
  "Ya lo he oído todo: te quiero como amigo, deberíamos ver a otras personas, no me dejan mis papás, mi amor es el mar...",
  "Deben haberte visto.",
  "Mi mamá dice que soy súper"
];

export function respuestaAleatoria() {
  const idx = Math.floor(Math.random() * RESPUESTAS_RANDOM.length);
  return RESPUESTAS_RANDOM[idx];
}
