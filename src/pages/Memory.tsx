
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Memory = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-assistant-purple-light/30">
      <header className="flex items-center justify-between bg-assistant-purple-dark text-white p-4 shadow-md">
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Go back to welcome screen"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Memory</h1>
        <div className="w-8"></div>
      </header>
      
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-assistant-gray-dark">Your Conversation History</h2>
          <p className="text-lg text-assistant-gray-DEFAULT mb-8">
            All your past conversations will be saved here for easy reference.
          </p>
          <button
            onClick={() => navigate('/chat')}
            className="px-6 py-3 bg-assistant-purple-DEFAULT text-white rounded-lg hover:bg-assistant-purple-dark transition-colors"
          >
            Start New Conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Memory;
