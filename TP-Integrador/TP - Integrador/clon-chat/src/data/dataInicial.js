export const CHATS_INICIALES = [
  {
    id: 1,
    nombre: "Elmo",
    estado: "en_linea",
    ultimaVez: "hace 2 horas",
    avatar: "/perfiles/elmo.png",
  },
  {
    id: 2,
    nombre: "Beto",
    estado: "desconectado",
    ultimaVez: "hace 7 min",
    avatar: "/perfiles/beto.webp",
  },
  {
    id: 3,
    nombre: "Abelardo",
    estado: "en_linea",
    ultimaVez: "en línea",
    avatar: "/perfiles/bird.jpg",
  },
];

export const MENSAJES_INICIALES = {
  1: [
    { id: 1, from: "app", text: "No seas malo con Elmo", time: "10:12" },
    { id: 2, from: "app", text: "Elmo sabe donde vives", time: "10:15" },
  ],
  2: [],
  3: [],
};

export const AVATAR_DEFAULT = "/perfiles/cookie.webp";
