import { Message } from "@/types/Message";
import ChatBubble from "./ChatBubble";
import LoadingChatBubble from "./LoadingChatBubble";

interface ChatBubbleProps {
    chatHistory: Message[];
    isLoading: boolean;
}

const ChatArea = ({ chatHistory, isLoading }: ChatBubbleProps) => {
    return (
        <div className='overflow-y-auto custom-scrollbar custom-scrollbar-thin mt-4 md:mt-6 h-full flex flex-col gap-3'>

            {chatHistory.map((message, index) => {
                return <ChatBubble key={index} message={message} />
            })}
            {isLoading && <LoadingChatBubble />}
        </div>
    )
}

export default ChatArea
