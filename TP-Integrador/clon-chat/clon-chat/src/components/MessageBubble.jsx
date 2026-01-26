export default function MessageBubble({ mensaje }) {
  return (
    <div className={`message-bubble ${mensaje.from}`}>
      <div className="message-text">{mensaje.text}</div>
      <div className="message-time">{mensaje.time}</div>
    </div>
  );
}
