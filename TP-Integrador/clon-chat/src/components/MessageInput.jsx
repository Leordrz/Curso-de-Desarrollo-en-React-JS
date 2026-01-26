import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const limpio = text.trim();
    if (!limpio) return;

    onSend(limpio);
    setText("");
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        placeholder="Escribí un mensaje..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
