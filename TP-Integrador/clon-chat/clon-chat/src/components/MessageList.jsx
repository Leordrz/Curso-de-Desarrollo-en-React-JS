import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble.jsx";
import "../styles/messages.css";

export default function MessageList({ mensajes }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  return (
    <div className="message-list">
      {mensajes.map((msg) => (
        <MessageBubble key={msg.id} mensaje={msg} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
