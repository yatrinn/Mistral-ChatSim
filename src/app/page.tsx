"use client";
import { useState } from 'react';

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ role: string; message: string }[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() === "") return;
    const userMessage = input;
    setChat([...chat, { role: "user", message: userMessage }]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    if (res.ok) {
      const data = await res.json();
      setChat((prev) => [...prev, { role: "ai", message: data.reply }]);
    } else {
      setChat((prev) => [
        ...prev,
        { role: "ai", message: "Error: Could not get reply." }
      ]);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Chat with Mistral AI Demo</h1>
      <div style={{
        marginBottom: "1rem",
        border: "1px solid #ccc",
        padding: "1rem",
        height: "300px",
        overflowY: "auto"
      }}>
        {chat.map((entry, index) => (
          <div key={index} style={{ marginBottom: "0.5rem" }}>
            <strong>{entry.role === "user" ? "You" : "AI"}:</strong> {entry.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "80%", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: "1rem" }}>
          Send
        </button>
      </form>
    </div>
  );
}
