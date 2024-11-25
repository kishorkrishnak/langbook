import { Message } from "ai";
import ChatBubble from "./ChatBubble";
interface ChatBubbleProps {
    chatHistory: Message[];
}

const ChatArea = ({ chatHistory }: ChatBubbleProps) => {
    return (
        <div className="overflow-y-auto custom-scrollbar custom-scrollbar-thin mt-4 md:mt-6 h-full flex flex-col gap-3">
            {chatHistory.map((message, index) => {
                return <ChatBubble key={index} message={message} />;
            })}
        </div>
    );
};

export default ChatArea;
