
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Volume2, RotateCcw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const SignLanguage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeTab, setActiveTab] = useState('sign-to-text');
  const [detectedText, setDetectedText] = useState('');
  const [inputText, setInputText] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  // Start camera when on sign-to-text tab
  useEffect(() => {
    if (activeTab === 'sign-to-text' && !cameraActive) {
      startCamera();
    } else if (activeTab !== 'sign-to-text' && cameraActive) {
      stopCamera();
    }
    
    return () => {
      if (cameraActive) {
        stopCamera();
      }
    };
  }, [activeTab, cameraActive]);
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
      
      // Provide audio feedback
      speakText("Camera activated. Make sign language gestures in front of the camera.");
      
    } catch (err) {
      console.error("Error accessing camera:", err);
      speakText("Could not access camera. Please check your device permissions.");
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };
  
  const startSignDetection = () => {
    setIsDetecting(true);
    speakText("Detecting signs. Please hold your hand gestures steady.");
    
    // Provide haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
    
    // Simulate sign detection (would be replaced by actual AI)
    setTimeout(() => {
      const possibleDetections = [
        "Hello, how are you?",
        "I need help, please.",
        "Thank you very much.",
        "Where is the bathroom?",
        "My name is John."
      ];
      
      const result = possibleDetections[Math.floor(Math.random() * possibleDetections.length)];
      setDetectedText(result);
      setIsDetecting(false);
      
      // Speak the detected text
      speakText(`Detected: ${result}`);
      
      // Haptic feedback for completion
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }, 3000);
  };
  
  const generateSignLanguage = () => {
    if (!inputText.trim()) {
      speakText("Please enter some text first.");
      return;
    }
    
    setIsGenerating(true);
    speakText("Generating sign language visuals for your text.");
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
    
    // Simulate generation delay (would be replaced by actual AI)
    setTimeout(() => {
      setIsGenerating(false);
      
      // Haptic feedback for completion
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
      
      speakText("Sign language generation complete.");
    }, 2000);
  };
  
  const resetDetectedText = () => {
    setDetectedText('');
    speakText("Reset complete. Ready for new sign detection.");
  };
  
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const adjustPlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    speakText(`Playback speed set to ${speed === 0.5 ? 'slow' : speed === 1 ? 'normal' : 'fast'}.`);
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
        <h1 className="text-2xl font-bold">Sign Language</h1>
        <div className="w-8"></div>
      </header>
      
      <Tabs 
        defaultValue="sign-to-text" 
        className="flex-1 flex flex-col"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-2 m-4">
          <TabsTrigger value="sign-to-text" className="text-lg py-3">Sign to Text</TabsTrigger>
          <TabsTrigger value="text-to-sign" className="text-lg py-3">Text to Sign</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sign-to-text" className="flex-1 flex flex-col p-4">
          <p className="text-lg text-center mb-4 bg-white p-3 rounded-lg shadow-sm">
            Hold your hand gestures steady in front of the camera.
          </p>
          
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-lg mb-6 bg-black">
              <video 
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-auto min-h-[300px]"
                aria-label="Live camera feed for sign language detection"
              ></video>
            </div>
            
            <Button 
              className="mb-6 bg-assistant-purple-DEFAULT hover:bg-assistant-purple-dark px-8 py-3 text-lg"
              onClick={startSignDetection}
              disabled={isDetecting || !cameraActive}
            >
              {isDetecting ? "Detecting..." : "Detect Signs"}
            </Button>
            
            {detectedText && (
              <Card className="w-full max-w-lg animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">Detected Text</h2>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => speakText(detectedText)}
                        aria-label="Read detected text aloud"
                      >
                        <Volume2 className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={resetDetectedText}
                        aria-label="Reset detection"
                      >
                        <RotateCcw className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-2xl">{detectedText}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="text-to-sign" className="flex-1 flex flex-col p-4">
          <div className="mb-4">
            <label htmlFor="text-input" className="text-lg font-medium block mb-2">
              Enter text to convert to sign language:
            </label>
            <div className="flex gap-2">
              <Input 
                id="text-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a sentence..."
                className="text-lg py-6"
              />
              <Button 
                onClick={generateSignLanguage}
                disabled={isGenerating || !inputText.trim()}
                aria-label="Generate sign language"
              >
                <Play className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow-sm">
            {isGenerating ? (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                <p className="text-lg">Generating sign language...</p>
              </div>
            ) : inputText ? (
              <div className="text-center">
                <div className="mb-6 h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">Sign language animation would appear here</p>
                  {/* In a real app, this would be a video or animation showing the signs */}
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Playback Speed</h3>
                  <div className="flex justify-center gap-4">
                    <Button 
                      variant={playbackSpeed === 0.5 ? "default" : "outline"}
                      onClick={() => adjustPlaybackSpeed(0.5)}
                    >
                      Slow
                    </Button>
                    <Button 
                      variant={playbackSpeed === 1 ? "default" : "outline"}
                      onClick={() => adjustPlaybackSpeed(1)}
                    >
                      Normal
                    </Button>
                    <Button 
                      variant={playbackSpeed === 1.5 ? "default" : "outline"}
                      onClick={() => adjustPlaybackSpeed(1.5)}
                    >
                      Fast
                    </Button>
                  </div>
                </div>
                
                <Button 
                  onClick={() => speakText(inputText)}
                  variant="outline"
                  className="flex items-center"
                >
                  <Volume2 className="h-5 w-5 mr-2" />
                  Read Text Aloud
                </Button>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                Enter text above to see it converted to sign language
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignLanguage;
