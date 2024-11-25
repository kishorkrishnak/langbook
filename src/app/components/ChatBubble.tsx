'use client';

import { Message } from "ai";

interface ChatBubbleProps {
    message: Message;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
    console.log(typeof message.createdAt);
    return (
        <div className={`chat ${message?.role === "assistant" ? "chat-start" : "chat-end"}`}>
            <div className="relative chat-bubble chat-bubble-info text-white max-w-[90%] md:max-w-sm">
                {message.content.split("\n").map((line, idx) => (
                    <p key={idx}>{line}</p>
                ))}
                <p className='ml-auto w-fit text-[10px] text-gray-100'>
                    {new Date(message?.createdAt as string | number | Date)?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>


        </div>
    );
};

export default ChatBubble;
