import { useEffect, useMemo, useRef, useState } from "react";
import { CHATS_INICIALES, MENSAJES_INICIALES, AVATAR_DEFAULT } from "../data/dataInicial.js";
import { horaCorta, siguienteId, normalizarNombre, respuestaAleatoria } from "../extras/chatExtras.js";

export function useChatApp() {
  const [chats, setChats] = useState(CHATS_INICIALES);
  const [chatActivoId, setChatActivoId] = useState(CHATS_INICIALES[0]?.id ?? null);
  const [mensajesPorChat, setMensajesPorChat] = useState(MENSAJES_INICIALES);
  const ultimoMensajeUsuarioProcesadoRef = useRef({});
  const timeoutRef = useRef(null);

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
  };

  useEffect(() => {
    if (!chatActivoId) return;

    const mensajes = mensajesPorChat[chatActivoId] || [];
    if (mensajes.length === 0) return;

    const ultimo = mensajes[mensajes.length - 1];

    if (ultimo.from !== "me") return;
    const yaProcesadoId = ultimoMensajeUsuarioProcesadoRef.current[chatActivoId];

    if (yaProcesadoId === ultimo.id) return;
    ultimoMensajeUsuarioProcesadoRef.current[chatActivoId] = ultimo.id;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      agregarMensajeAlChat(chatActivoId, {
        id: Date.now(),
        from: "app",
        text: respuestaAleatoria(),
        time: horaCorta(),
      });
    }, 900);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [chatActivoId, mensajesPorChat]);

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
