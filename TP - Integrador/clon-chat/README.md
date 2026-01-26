# TP Integrador - Chat (React + CSS Nativo)

Aplicación tipo chat. Permite crear chats, enviar mensajes y recibir respuestas automáticas. El objetivo es practicar componentes, props, estado y organización del proyecto usando React y CSS nativo.

## Funcionalidades
- Lista de chats con buscador.
- Creación de nuevos chats (botón “Nuevo”).
- Historial de mensajes independiente por chat.
- Envío de mensajes.
- Respuesta automática simulada con retardo (implementada con `useEffect`).
- Auto-scroll al último mensaje (useEffect en la lista de mensajes).
- Estilos con CSS nativo y layout con Flexbox.
- Responsive básico: en pantallas pequeñas se apilan sidebar y chat.

## Tecnologías
- React (Vite)
- JavaScript
- CSS nativo

## Instalación y ejecución
1. Clonar el repositorio:
   ```bash
    git clone https://github.com/Leordrz/Curso-de-Desarrollo-en-React-JS.git
    cd "Curso-de-Desarrollo-en-React-JS\TP - Integrador\clon-chat"

## Estructura del proyecto
  ```bash
    src/components/: componentes reutilizables (ChatList, ChatWindow, MessageList, etc.)
    src/data/: datos iniciales (chats y mensajes)
    src/extras/: funciones auxiliares (hora, ids, respuestas aleatorias, normalización)
    src/hooks/: lógica del chat encapsulada en un hook (useChatApp)
    src/styles/: estilos CSS separados por responsabilidad
    public/perfiles/: avatares (rutas absolutas como /perfiles/...)