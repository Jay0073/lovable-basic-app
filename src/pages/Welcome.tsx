
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import WelcomeButton from '@/components/WelcomeButton';

const Welcome = () => {
  const navigate = useNavigate();
  
  // For accessibility, announce the page when it loads
  React.useEffect(() => {
    const announcement = new SpeechSynthesisUtterance("Welcome to Your Assistant. Helping you every step of the way.");
    window.speechSynthesis.speak(announcement);
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #9b87f5 0%, #6E59A5 100%)' }}
      role="main"
      aria-label="Welcome screen"
    >
      {/* Background animated circles for visual interest */}
      <div className="absolute w-64 h-64 bg-white/10 rounded-full -top-20 -right-20 blur-xl" />
      <div className="absolute w-96 h-96 bg-white/5 rounded-full -bottom-40 -left-20 blur-xl" />
      
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <Logo />
        </div>
        
        {/* Welcome Text */}
        <h1 
          className="text-4xl font-bold text-white mb-3 text-center animate-fade-in"
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}
        >
          Welcome to Your Assistant
        </h1>
        <p 
          className="text-xl text-white/90 mb-12 text-center animate-fade-in"
          style={{ animationDelay: '400ms', animationFillMode: 'both' }}
        >
          Helping you every step of the way
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col w-full space-y-4">
          <WelcomeButton 
            icon="💬" 
            label="Start Chat" 
            onClick={() => navigate('/chat')} 
            delay={600} 
          />
          <WelcomeButton 
            icon="🧠" 
            label="View Memory" 
            onClick={() => navigate('/memory')} 
            delay={800} 
          />
          <WelcomeButton 
            icon="⚙️" 
            label="Settings" 
            onClick={() => navigate('/settings')} 
            delay={1000} 
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
