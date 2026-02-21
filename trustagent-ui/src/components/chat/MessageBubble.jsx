export default function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "10px"
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "12px 14px",
          borderRadius: "12px",
          background: isUser ? "#2563eb" : "#1f2933",
          color: "#fff"
        }}
      >
        {text}
      </div>
    </div>
  );
}
