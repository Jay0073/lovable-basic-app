
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Volume2 } from 'lucide-react';

export interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  isNew?: boolean;
}

const Message = ({ content, isUser, timestamp, isNew = false }: MessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  
  // Scroll new messages into view
  useEffect(() => {
    if (isNew && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
      
      // Vibration feedback for blind users when receiving a message
      if (!isUser && 'vibrate' in navigator) {
        navigator.vibrate(200);
      }
    }
  }, [isNew, isUser]);

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div 
      ref={messageRef}
      className={cn(
        "flex max-w-[80%] my-2",
        isUser ? "ml-auto" : "mr-auto",
        isNew && "animate-fade-in"
      )}
    >
      <div
        className={cn(
          "p-4 rounded-2xl",
          isUser 
            ? "bg-assistant-purple-dark text-white rounded-tr-none" 
            : "bg-white text-assistant-gray-dark rounded-tl-none"
        )}
        aria-label={`${isUser ? 'Your message' : 'Assistant message'}: ${content}`}
      >
        <p className="text-lg">{content}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs opacity-70">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          
          {!isUser && (
            <button
              onClick={handleTextToSpeech}
              className="ml-2 p-1 rounded-full hover:bg-assistant-purple-light/20 transition-colors"
              aria-label="Read message aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
