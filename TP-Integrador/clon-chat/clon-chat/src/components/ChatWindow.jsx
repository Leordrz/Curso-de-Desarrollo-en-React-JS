import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";
import "../styles/chat.css";

export default function ChatWindow({ chat, mensajes, onSendMessage }) {
  if (!chat) {
    return <div className="chat-window">Seleccioná un chat</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{chat.nombre}</h3>
        <span className="chat-status">
          {chat.estado === "en_linea" ? "En línea" : "Desconectado"}
        </span>
      </div>

      <MessageList mensajes={mensajes} />

      <MessageInput onSend={onSendMessage} />
    </div>
  );
}
