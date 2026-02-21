import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "15px",
        borderTop: "1px solid #334155",
        background: "#020617"
      }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message TrustAgent..."
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          background: "#020617",
          color: "#fff"
        }}
      />
      <button
        onClick={send}
        style={{
          marginLeft: "10px",
          padding: "12px 16px",
          borderRadius: "8px",
          background: "#2563eb",
          border: "none",
          color: "#fff"
        }}
      >
        Send
      </button>
    </div>
  );
}
