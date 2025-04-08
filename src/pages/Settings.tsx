
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Languages, 
  Volume2, 
  VolumeX, 
  Trash2, 
  Calendar, 
  Moon, 
  Sun,
  Info 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Settings = () => {
  const navigate = useNavigate();
  const [textToSpeech, setTextToSpeech] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [language, setLanguage] = useState('english');
  const [textSize, setTextSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [memorySummary, setMemorySummary] = useState('weekly');
  
  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    return () => {
      document.body.classList.remove('high-contrast');
    };
  }, [highContrast]);
  
  // Apply text size
  useEffect(() => {
    document.body.classList.remove('large-text', 'larger-text');
    
    if (textSize === 'large') {
      document.body.classList.add('large-text');
    } else if (textSize === 'larger') {
      document.body.classList.add('larger-text');
    }
    
    return () => {
      document.body.classList.remove('large-text', 'larger-text');
    };
  }, [textSize]);
  
  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [darkMode]);
  
  const handleTextToSpeechChange = (checked: boolean) => {
    setTextToSpeech(checked);
    
    // Provide feedback
    if (checked) {
      speakText("Text to speech enabled");
    } else {
      toast.success("Text to speech disabled");
    }
    
    // Haptic feedback
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };
  
  const handleHapticFeedbackChange = (checked: boolean) => {
    setHapticFeedback(checked);
    
    // Provide feedback
    if (textToSpeech) {
      speakText(checked ? "Haptic feedback enabled" : "Haptic feedback disabled");
    }
    
    if (checked && 'vibrate' in navigator) {
      navigator.vibrate(100);
    }
    
    toast.success(checked ? "Haptic feedback enabled" : "Haptic feedback disabled");
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    
    // Provide feedback
    if (textToSpeech) {
      speakText(`Language changed to ${value}`);
    }
    
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(100);
    }
    
    toast.success(`Language changed to ${value}`);
  };
  
  const handleTextSizeChange = (value: string) => {
    setTextSize(value);
    
    // Provide feedback
    if (textToSpeech) {
      speakText(`Text size changed to ${value}`);
    }
    
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(100);
    }
    
    toast.success(`Text size changed to ${value}`);
  };
  
  const handleClearMemory = () => {
    // In a real app, this would clear the user's memory data
    
    // Provide feedback
    if (textToSpeech) {
      speakText("Memory cleared");
    }
    
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
    
    toast.success("Memory cleared successfully");
  };
  
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };
  
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
      
      <div className="flex-1 p-4 pb-20 overflow-auto">
        <div className="max-w-md mx-auto">
          {/* Accessibility Settings */}
          <h2 className="text-xl font-semibold mb-4 text-assistant-gray-dark">
            Accessibility Settings
          </h2>
          
          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {textToSpeech ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                    <div>
                      <p className="text-lg font-medium">Text-to-Speech</p>
                      <p className="text-sm text-gray-500">Enable automatic reading of messages</p>
                    </div>
                  </div>
                  <Switch 
                    checked={textToSpeech} 
                    onCheckedChange={handleTextToSpeechChange}
                    aria-label="Toggle text to speech"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center">
                      {hapticFeedback ? (
                        <span className="animate-pulse w-4 h-4 bg-assistant-purple-DEFAULT rounded-full"></span>
                      ) : (
                        <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-medium">Haptic Feedback</p>
                      <p className="text-sm text-gray-500">Vibrate on messages and interactions</p>
                    </div>
                  </div>
                  <Switch 
                    checked={hapticFeedback} 
                    onCheckedChange={handleHapticFeedbackChange}
                    aria-label="Toggle haptic feedback"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Languages className="w-6 h-6" />
                    <div>
                      <p className="text-lg font-medium">Language</p>
                      <p className="text-sm text-gray-500">Select your preferred language</p>
                    </div>
                  </div>
                </div>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🅰️</span>
                    <div>
                      <p className="text-lg font-medium">Text Size</p>
                      <p className="text-sm text-gray-500">Adjust the size of text</p>
                    </div>
                  </div>
                </div>
                <Select value={textSize} onValueChange={handleTextSizeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select text size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="larger">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                    <div>
                      <p className="text-lg font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-500">Use dark theme for low light conditions</p>
                    </div>
                  </div>
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode}
                    aria-label="Toggle dark mode"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <p className="text-lg font-medium">High Contrast Mode</p>
                      <p className="text-sm text-gray-500">Improve visibility with higher contrast</p>
                    </div>
                  </div>
                  <Switch 
                    checked={highContrast} 
                    onCheckedChange={setHighContrast}
                    aria-label="Toggle high contrast mode"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Memory Settings */}
          <h2 className="text-xl font-semibold mb-4 text-assistant-gray-dark">
            Memory Settings
          </h2>
          
          <div className="space-y-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    <div>
                      <p className="text-lg font-medium">Memory Summary</p>
                      <p className="text-sm text-gray-500">How often to receive memory summaries</p>
                    </div>
                  </div>
                </div>
                <Select value={memorySummary} onValueChange={setMemorySummary}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-6 h-6 text-destructive" />
                    <div>
                      <p className="text-lg font-medium">Clear Memory</p>
                      <p className="text-sm text-gray-500">Delete all saved memories</p>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleClearMemory}
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* About Section */}
          <h2 className="text-xl font-semibold mb-4 text-assistant-gray-dark">
            About
          </h2>
          
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5" />
                About the App
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                Your Personal AI Assistant, version 1.0.0
              </p>
              <p className="text-sm text-gray-600">
                This AI assistant is designed with accessibility in mind, supporting features like text-to-speech, haptic feedback, and high contrast mode to help users with various disabilities.
              </p>
            </CardContent>
          </Card>
          
          <div className="flex justify-center">
            <Button 
              className="w-full max-w-sm bg-assistant-purple-DEFAULT hover:bg-assistant-purple-dark"
              onClick={() => {
                toast.success("Settings saved successfully");
                
                if (textToSpeech) {
                  speakText("Settings saved successfully");
                }
                
                if (hapticFeedback && 'vibrate' in navigator) {
                  navigator.vibrate(200);
                }
              }}
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
