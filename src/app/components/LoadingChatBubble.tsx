'use client'
import { useEffect, useState } from "react"

const LoadingChatBubble = ({ }) => {
    const [dots, setDots] = useState<string[]>(["."])
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length >= 5) {
                    return ["."]
                }
                return [...prevDots, "."]
            })
        }, 300)

        return () => clearInterval(interval)
    })
    return (
        <div className="chat chat-start">
            <div className="relative chat-bubble chat-bubble-info text-white max-w-[90%] md:max-w-sm">
                {dots.map(() => ".")}
            </div>
        </div>
    )
}

export default LoadingChatBubble
