import ChatList from "./components/ChatList.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import "./styles/app.css";
import { useChatApp } from "./hooks/useChatApp.js";

export default function App() {
  const {
    chats,
    chatActivoId,
    setChatActivoId,
    chatActivo,
    mensajesActivos,
    enviarMensaje,
    crearNuevoChat,
  } = useChatApp();

  return (
    <div className="app">
      <aside className="sidebar">
        <ChatList
          chats={chats}
          chatActivoId={chatActivoId}
          onSelectChat={setChatActivoId}
          onCreateChat={crearNuevoChat}
        />
      </aside>

      <main className="chat">
        <ChatWindow
          chat={chatActivo}
          mensajes={mensajesActivos}
          onSendMessage={enviarMensaje}
        />
      </main>
    </div>
  );
}
