
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Settings = () => {
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
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="w-8"></div>
      </header>
      
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-assistant-gray-dark">Accessibility Settings</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <label className="flex items-center justify-between">
                <span className="text-lg">Text-to-Speech</span>
                <input 
                  type="checkbox" 
                  defaultChecked={true}
                  className="w-6 h-6 rounded text-assistant-purple-DEFAULT focus:ring-assistant-purple-light"
                />
              </label>
              <p className="text-sm text-assistant-gray-DEFAULT mt-1">Enable automatic reading of messages</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <label className="flex items-center justify-between">
                <span className="text-lg">Haptic Feedback</span>
                <input 
                  type="checkbox" 
                  defaultChecked={true}
                  className="w-6 h-6 rounded text-assistant-purple-DEFAULT focus:ring-assistant-purple-light"
                />
              </label>
              <p className="text-sm text-assistant-gray-DEFAULT mt-1">Vibrate on messages and interactions</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <label className="flex flex-col">
                <span className="text-lg mb-2">Text Size</span>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  defaultValue="2"
                  className="w-full h-2 bg-assistant-gray-light rounded-lg appearance-none cursor-pointer"
                />
              </label>
              <div className="flex justify-between text-sm text-assistant-gray-DEFAULT mt-1">
                <span>Small</span>
                <span>Medium</span>
                <span>Large</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <label className="flex items-center justify-between">
                <span className="text-lg">High Contrast Mode</span>
                <input 
                  type="checkbox" 
                  defaultChecked={false}
                  className="w-6 h-6 rounded text-assistant-purple-DEFAULT focus:ring-assistant-purple-light"
                />
              </label>
              <p className="text-sm text-assistant-gray-DEFAULT mt-1">Improve visibility with higher contrast</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
