import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        overflowY: "auto"
      }}
    >
      {messages.map((m, i) => (
        <MessageBubble key={i} role={m.role} text={m.text} />
      ))}
    </div>
  );
}
