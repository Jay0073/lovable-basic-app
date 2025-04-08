
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { 
  MessageSquare, 
  Brain, 
  Settings as SettingsIcon, 
  Camera, 
  Languages 
} from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-assistant-purple-light/50 to-assistant-purple-DEFAULT/30">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="animate-fade-in text-center">
          <div className="mb-8">
            <Logo />
          </div>
          
          <h1 className="text-4xl font-bold mb-2 text-assistant-gray-dark">
            Welcome to Your Assistant
          </h1>
          <p className="text-xl text-assistant-gray-DEFAULT mb-12">
            Helping you every step of the way
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <WelcomeButton 
              icon={<MessageSquare className="w-8 h-8" />}
              label="Start Chat"
              onClick={() => navigate('/chat')}
              delay={0.1}
            />
            
            <WelcomeButton 
              icon={<Brain className="w-8 h-8" />}
              label="View Memory"
              onClick={() => navigate('/memory')}
              delay={0.2}
            />
            
            <WelcomeButton 
              icon={<SettingsIcon className="w-8 h-8" />}
              label="Settings"
              onClick={() => navigate('/settings')}
              delay={0.3}
            />
            
            <WelcomeButton 
              icon={<Camera className="w-8 h-8" />}
              label="Camera Input"
              onClick={() => navigate('/camera')}
              delay={0.4}
            />
            
            <WelcomeButton 
              icon={<Languages className="w-8 h-8" />}
              label="Sign Language"
              onClick={() => navigate('/sign-language')}
              delay={0.5}
            />
          </div>
        </div>
      </main>
      
      <footer className="p-4 text-center text-sm text-assistant-gray-DEFAULT">
        <p>© 2025 AI Assistant • Version 1.0</p>
      </footer>
    </div>
  );
};

interface WelcomeButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  delay: number;
}

const WelcomeButton = ({ icon, label, onClick, delay }: WelcomeButtonProps) => {
  return (
    <button
      className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 focus:ring-2 focus:ring-assistant-purple"
      onClick={onClick}
      style={{ 
        animationDelay: `${delay}s`,
        animation: 'fade-in 0.5s ease-out forwards',
        opacity: 0
      }}
      aria-label={label}
    >
      <div className="p-4 rounded-full bg-assistant-purple-DEFAULT/10 mb-4">
        <div className="text-assistant-purple-DEFAULT">{icon}</div>
      </div>
      <span className="text-xl font-medium text-assistant-gray-dark">{label}</span>
    </button>
  );
};

export default Welcome;
