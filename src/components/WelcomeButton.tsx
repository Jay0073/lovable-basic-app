
import React from 'react';
import { cn } from '@/lib/utils';

interface WelcomeButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  delay?: number;
  className?: string;
}

const WelcomeButton = ({ 
  icon, 
  label, 
  onClick, 
  delay = 0,
  className
}: WelcomeButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center space-x-3 w-full max-w-xs py-4 px-6 rounded-xl",
        "bg-white/20 backdrop-blur-sm text-white font-medium text-xl",
        "hover:bg-white/30 transition-all duration-300 active:scale-95",
        "focus:outline-none focus:ring-4 focus:ring-white/30",
        "animate-fade-in",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
      onClick={onClick}
      aria-label={label}
    >
      <span className="text-2xl" aria-hidden="true">{icon}</span>
      <span className="text-xl">{label}</span>
    </button>
  );
};

export default WelcomeButton;
