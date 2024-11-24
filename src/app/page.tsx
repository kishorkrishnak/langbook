"use client";

import { Message } from "@/types/Message";
import { useEffect, useState } from "react";
import ChatArea from "./components/ChatArea";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const appendChat = (role: string, body: string) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        role,
        body,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  useEffect(() => {
    appendChat("AI", "Hello Welcome to LangBook 🥳, how can i help you?");
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const handleSendMessage = async () => {
    if (isLoading) return;

    const fullPrompt =
      chatHistory.reduce((acc, { role, body }) => {
        return acc + `${role}: ${body}`;
      }, "") + `User: ${prompt}\nAI:`;

    appendChat("User", prompt);
    setIsLoading(true);

    await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        prompt: fullPrompt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        appendChat("AI", json.text);
        setPrompt("");
      })
      .catch((error) => {
        appendChat("AI", "Oops! Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="h-screen w-full p-2 md:py-4 gap-4">
      <div className="w-full h-full border border-white flex flex-col md:flex-row items-between justify-between">
        <div className="py-2 px-1 md:p-4 h-full w-full flex flex-col items-between justify-between">
          <div className="text-white flex w-full justify-center p-2">
            <h1 className="text-center text-xl text-lg md:text-2xl font-semibold">
              Langbook - Language through books📕😊
            </h1>
          </div>
          <ChatArea isLoading={isLoading} chatHistory={chatHistory} />
          <div className="gap-4 flex w-full justify-between items-center  p-2">
            <input
              onKeyDown={handleKeyDown}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              placeholder="Enter your message"
              className="text-white border border-gray-300 rounded-md p-2 text-lg w-full"
            />

            <button
              className={`btn ${isLoading ? "btn-disabled" : "btn-success text-white "
                }`}
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
        <div className="hidden md:flex h-full w-full md:w-[300px] border-l border-white"></div>
      </div>
    </div>
  );
}
