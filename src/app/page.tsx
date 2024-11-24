"use client";

import { useChat } from "ai/react";
import { useEffect } from "react";
import ChatArea from "./components/ChatArea";
import Header from "./components/Header";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat();

  useEffect(() => {
    getInitialMessage()
  }, [])

  const getInitialMessage = async function () {
    const res = await fetch("/api/initialmessage")
    const initialMessage = await res.json()
    setMessages([initialMessage])
  }


  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  };

  return (
    <div className="h-screen w-full p-2 md:py-4 gap-4">
      <div className="w-full h-full border border-white flex flex-col md:flex-row items-between justify-between">
        <div className="py-2 px-1 md:p-4 h-full w-full flex flex-col items-between justify-between">
          <Header />
          <ChatArea chatHistory={messages} />
          <form
            onSubmit={handleSubmit}
            className="gap-4 flex w-full justify-between items-center  p-2">
            <input
              onKeyDown={handleKeyDown}
              value={input}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter your message"
              className="text-white border border-gray-300 rounded-md p-2 text-lg w-full"
            />

            <button
              type="submit"
              className={`btn ${isLoading ? "btn-disabled" : "btn-success text-white "
                }`}
            >
              Send
            </button>
          </form>
        </div>
        <div className="hidden md:flex h-full w-full md:w-[300px] border-l border-white"></div>
      </div>
      
    </div>
  );
}
