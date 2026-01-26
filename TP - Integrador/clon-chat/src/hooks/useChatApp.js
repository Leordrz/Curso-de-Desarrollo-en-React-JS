import { useMemo, useState } from "react";
import { CHATS_INICIALES, MENSAJES_INICIALES, AVATAR_DEFAULT } from "../data/dataInicial.js";
import { horaCorta, siguienteId, normalizarNombre, respuestaAleatoria } from "../extras/chatExtras.js";

export function useChatApp() {
  const [chats, setChats] = useState(CHATS_INICIALES);
  const [chatActivoId, setChatActivoId] = useState(CHATS_INICIALES[0]?.id ?? null);
  const [mensajesPorChat, setMensajesPorChat] = useState(MENSAJES_INICIALES);

  const chatActivo = useMemo(
    () => chats.find((c) => c.id === chatActivoId),
    [chats, chatActivoId]
  );

  const mensajesActivos = useMemo(
    () => mensajesPorChat[chatActivoId] || [],
    [mensajesPorChat, chatActivoId]
  );

  const agregarMensajeAlChat = (chatId, mensaje) => {
    setMensajesPorChat((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), mensaje],
    }));
  };

  const enviarMensaje = (texto) => {
    const limpio = normalizarNombre(texto);
    if (!limpio) return;

    const chatId = chatActivoId;
    if (!chatId) return;

    agregarMensajeAlChat(chatId, {
      id: Date.now(),
      from: "me",
      text: limpio,
      time: horaCorta(),
    });

    setTimeout(() => {
      agregarMensajeAlChat(chatId, {
        id: Date.now() + 1,
        from: "app",
        text: respuestaAleatoria(),
        time: horaCorta(),
      });
    }, 900);
  };

  const crearNuevoChat = () => {
    const nombre = window.prompt("Nombre del nuevo chat:");
    const limpio = normalizarNombre(nombre);
    if (!limpio) return;

    setChats((prev) => {
      const nuevoId = siguienteId(prev);
      const nuevoChat = {
        id: nuevoId,
        nombre: limpio,
        estado: "desconectado",
        ultimaVez: "recién creado",
        avatar: AVATAR_DEFAULT,
      };
      setMensajesPorChat((msgsPrev) => ({ ...msgsPrev, [nuevoId]: [] }));
      setChatActivoId(nuevoId);

      return [nuevoChat, ...prev];
    });
  };

  return {
    chats,
    chatActivoId,
    setChatActivoId,
    chatActivo,
    mensajesActivos,
    enviarMensaje,
    crearNuevoChat,
  };
}
