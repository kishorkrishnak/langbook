import { Message } from "@/types/Message";

interface ChatBubbleProps {
    message: Message;
}
const ChatBubble = ({ message }: ChatBubbleProps) => {
    return (
        <div className={`chat ${message.role === "AI" ? "chat-start" : "chat-end"}`}>
            <div className="relative chat-bubble chat-bubble-info text-white max-w-[90%] md:max-w-sm">
                {message.body}
                <p className='ml-auto w-fit text-[10px] text-gray-100'>
                    {message.time}
                </p>
            </div>
        </div>
    )
}

export default ChatBubble
