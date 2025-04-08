
import React from 'react';
import { Brain } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center" aria-label="AI Assistant Logo">
      <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
        <Brain className="w-16 h-16 text-white" aria-hidden="true" />
      </div>
    </div>
  );
};

export default Logo;
