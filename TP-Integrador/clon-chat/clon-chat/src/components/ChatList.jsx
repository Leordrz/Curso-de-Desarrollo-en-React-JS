import { useMemo, useState } from "react";
import ChatItem from "./ChatItem.jsx";
import "../styles/sidebar.css";

export default function ChatList({ chats, chatActivoId, onSelectChat, onCreateChat }) {
  const [query, setQuery] = useState("");

  const chatsFiltrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chats;

    return chats.filter((c) => c.nombre.toLowerCase().includes(q));
  }, [chats, query]);

  return (
    <div className="chatlist">
      <div className="chatlist-top">
        <input
          className="chatlist-search"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="chatlist-new" onClick={onCreateChat}>
          Nuevo
        </button>
      </div>

      <div className="chatlist-items">
        {chatsFiltrados.length === 0 ? (
          <div className="chatlist-empty">No hay chats que coincidan.</div>
        ) : (
          chatsFiltrados.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              active={chat.id === chatActivoId}
              onClick={() => onSelectChat(chat.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
