import { useState } from "react";
import ChatWindow from "../components/chat/ChatWindow.jsx";
import ChatInput from "../components/chat/ChatInput.jsx";
import DocumentList from "../components/Docs/documentlist";
import AppLayout from "../components/Layout/AppLayout";

export default function Dashboard() {
  const [messages, setMessages] = useState([
    { role: "agent", text: "👋 Hi, I’m TrustAgent. Upload or ask anything." }
  ]);

  const [docs] = useState([
    { fileName: "Aadhaar.pdf", docType: "aadhaar" }
  ]);

  const handleSend = (text) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "agent", text: "🤖 I understood your request." }
    ]);
  };

  return (
    <AppLayout>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatWindow messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>

      <DocumentList docs={docs} />
    </AppLayout>
  );
}
