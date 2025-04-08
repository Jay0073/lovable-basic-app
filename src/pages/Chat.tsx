
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Message, { MessageProps } from '@/components/Message';
import { ArrowLeft, MessageSquare, Camera, Mic, Send, Brain, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

// Sample initial messages
const initialMessages: MessageProps[] = [
  {
    content: "Hello! How can I assist you today?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000),
    isNew: false
  }
];

type TabType = 'chat' | 'vision' | 'sign';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageProps[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Simulate speech recognition
  const startRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsRecording(true);
      // Vibration feedback for blind users
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 30, 100]);
      }
      
      toast({
        title: "Voice Recording",
        description: "Listening to your voice input...",
      });
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        stopRecording();
      }, 3000);
    } else {
      toast({
        title: "Not Supported",
        description: "Voice recording is not supported in your browser.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, this would process speech-to-text
    // For demo, we'll simulate by setting some input text
    setInputText("This is what I said using voice input");
    
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
    
    toast({
      title: "Voice Captured",
      description: "Your voice input has been processed.",
    });
  };
  
  const handleCameraInput = () => {
    // In a real app, this would access the camera
    toast({
      title: "Camera Access",
      description: "Camera functionality would open here.",
    });
  };
  
  const sendMessage = () => {
    if (inputText.trim()) {
      const userMessage: MessageProps = {
        content: inputText,
        isUser: true,
        timestamp: new Date(),
        isNew: true
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      
      // Vibration feedback for message sent
      if ('vibrate' in navigator) {
        navigator.vibrate(100);
      }
      
      // Simulate AI response after a delay
      setTimeout(() => {
        const assistantMessage: MessageProps = {
          content: "I've received your message and I'm here to help. How can I assist you further?",
          isUser: false,
          timestamp: new Date(),
          isNew: true
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);
    }
  };
  
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-assistant-purple-light/30">
      {/* Header */}
      <header className="flex items-center justify-between bg-assistant-purple-dark text-white p-4 shadow-md">
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Go back to welcome screen"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Assistant</h1>
        <div className="w-8"></div>
      </header>
      
      {/* Tabs */}
      <div className="flex bg-assistant-purple-DEFAULT text-white">
        <button 
          className={cn(
            "flex-1 py-3 px-2 flex items-center justify-center gap-2 transition-colors",
            activeTab === 'chat' ? "bg-assistant-purple-dark" : "hover:bg-assistant-purple-dark/70"
          )}
          onClick={() => setActiveTab('chat')}
          aria-pressed={activeTab === 'chat'}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-lg">Chat</span>
        </button>
        <button 
          className={cn(
            "flex-1 py-3 px-2 flex items-center justify-center gap-2 transition-colors",
            activeTab === 'vision' ? "bg-assistant-purple-dark" : "hover:bg-assistant-purple-dark/70"
          )}
          onClick={() => setActiveTab('vision')}
          aria-pressed={activeTab === 'vision'}
        >
          <Eye className="w-5 h-5" />
          <span className="text-lg">Vision</span>
        </button>
        <button 
          className={cn(
            "flex-1 py-3 px-2 flex items-center justify-center gap-2 transition-colors",
            activeTab === 'sign' ? "bg-assistant-purple-dark" : "hover:bg-assistant-purple-dark/70"
          )}
          onClick={() => setActiveTab('sign')}
          aria-pressed={activeTab === 'sign'}
        >
          <Brain className="w-5 h-5" />
          <span className="text-lg">Sign Language</span>
        </button>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message 
            key={index} 
            content={msg.content} 
            isUser={msg.isUser} 
            timestamp={msg.timestamp} 
            isNew={msg.isNew} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="p-4 bg-white border-t border-assistant-gray-light">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type or speak..."
              className="w-full px-5 py-4 pr-12 text-lg rounded-full border border-assistant-gray-light focus:outline-none focus:ring-2 focus:ring-assistant-purple-DEFAULT"
              aria-label="Message input"
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-assistant-purple-DEFAULT disabled:text-assistant-gray-DEFAULT rounded-full hover:bg-assistant-purple-light/20 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          
          <button
            onTouchStart={startRecording}
            onMouseDown={startRecording}
            onTouchEnd={() => isRecording && stopRecording()}
            onMouseUp={() => isRecording && stopRecording()}
            onTouchCancel={() => isRecording && stopRecording()}
            onMouseLeave={() => isRecording && stopRecording()}
            className={cn(
              "p-4 rounded-full transition-all duration-200",
              isRecording ? "bg-red-500 animate-pulse-light" : "bg-assistant-purple-DEFAULT hover:bg-assistant-purple-dark",
              "text-white"
            )}
            aria-label="Record voice input"
          >
            <Mic className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleCameraInput}
            className="p-4 rounded-full bg-assistant-purple-DEFAULT hover:bg-assistant-purple-dark transition-colors text-white"
            aria-label="Camera input"
          >
            <Camera className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
