
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Repeat, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const CameraInput = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [description, setDescription] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Start camera when component mounts
  React.useEffect(() => {
    startCamera();
    
    // Cleanup on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Provide audio feedback for blind users
      speakText("Camera activated. Point at what you want to see and press the Take Photo button at the bottom of the screen.");
      
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive"
      });
      speakText("Camera error. Could not access camera. Please check your device permissions.");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    // Provide haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
    
    // Play camera shutter sound
    new Audio('/shutter.mp3').play().catch(e => console.log("Audio couldn't play:", e));
    
    // Speak feedback
    speakText("Photo taken. Analyzing what's in the image.");
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the video frame to the canvas
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Process the image
    setIsProcessing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // This would be replaced by actual AI image analysis
      const mockDescriptions = [
        "A wooden table with a coffee mug and an open book. The book appears to be a novel with about 300 pages.",
        "A park scene with a bench under a large oak tree. There are fallen autumn leaves on the ground.",
        "A kitchen counter with fresh vegetables, including tomatoes, carrots, and lettuce. Looks like ingredients for a salad.",
        "A person wearing a blue jacket standing in front of what appears to be a bus stop on a city street.",
        "An office desk with a computer monitor, keyboard, and several documents spread out. There's also a small plant in the corner."
      ];
      
      const randomDescription = mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)];
      setDescription(randomDescription);
      setPhotoTaken(true);
      setIsProcessing(false);
      
      // Speak the description for blind users
      speakText(`Here's what I see: ${randomDescription}`);
      
    }, 3000);
  };

  const retakePhoto = () => {
    setPhotoTaken(false);
    setDescription('');
    
    // Vibration feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
    
    speakText("Ready to take another photo. Point camera at what you want to see.");
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlayDescription = () => {
    speakText(description);
    
    // Vibration feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
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
        <h1 className="text-2xl font-bold">What do you want to see?</h1>
        <div className="w-8"></div>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {/* Camera view */}
        <div className={`w-full max-w-lg rounded-2xl overflow-hidden shadow-lg ${photoTaken ? 'hidden' : 'block'}`}>
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-auto bg-black"
            aria-label="Live camera feed"
          ></video>
        </div>
        
        {/* Canvas for capturing the image */}
        <canvas ref={canvasRef} className="hidden"></canvas>
        
        {/* Photo description */}
        {photoTaken && (
          <Card className="w-full max-w-lg mb-4 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl font-semibold">Description</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handlePlayDescription}
                  aria-label="Read description aloud"
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-lg">{description}</p>
            </CardContent>
          </Card>
        )}
        
        {/* Processing overlay */}
        {isProcessing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
            <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white text-xl">Analyzing image...</p>
          </div>
        )}
      </div>
      
      {/* Control buttons */}
      <div className="bg-gray-100 p-6 flex justify-center">
        {!photoTaken ? (
          <Button 
            className="rounded-full h-16 w-16 bg-assistant-purple-dark hover:bg-assistant-purple-DEFAULT"
            onClick={capturePhoto}
            disabled={isProcessing}
            aria-label="Take photo"
          >
            <Camera className="h-8 w-8" />
          </Button>
        ) : (
          <Button 
            className="rounded-full bg-assistant-purple-DEFAULT hover:bg-assistant-purple-dark flex items-center px-6 py-3 text-lg"
            onClick={retakePhoto}
            aria-label="Take another photo"
          >
            <Repeat className="mr-2 h-6 w-6" />
            Retake
          </Button>
        )}
      </div>
    </div>
  );
};

export default CameraInput;
