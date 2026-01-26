export default function ChatItem({ chat, active, onClick }) {
  const inicial = chat.nombre?.trim()?.[0]?.toUpperCase() || "?";

  return (
    <div className={`chatitem ${active ? "active" : ""}`} onClick={onClick}>
      <div className="avatar">
        {chat.avatar ? (
          <img src={chat.avatar} alt={`Avatar de ${chat.nombre}`} />
        ) : (
          <span>{inicial}</span>
        )}
      </div>

      <div className="chatmeta">
        <div className="chatname">{chat.nombre}</div>
        <div className="chatstatus">
          {chat.estado === "en_linea" ? "En línea" : `Últ. vez: ${chat.ultimaVez}`}
        </div>
      </div>
    </div>
  );
}
