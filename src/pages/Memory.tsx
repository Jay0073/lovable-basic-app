
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Trash2, X, Tag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Memory {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags: string[];
}

const sampleMemories: Memory[] = [
  {
    id: '1',
    title: 'Doctor Appointment',
    content: 'Remember to bring medication list to Dr. Smith appointment',
    date: new Date(2025, 3, 15, 14, 30),
    tags: ['health', 'schedule']
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    content: 'Need to buy fresh vegetables and milk from the corner store',
    date: new Date(2025, 3, 12, 10, 0),
    tags: ['shopping', 'routine']
  },
  {
    id: '3',
    title: 'Birthday',
    content: 'Sarah\'s birthday is coming up, remember to call her',
    date: new Date(2025, 3, 20, 0, 0),
    tags: ['personal', 'reminder']
  }
];

const Memory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [memories, setMemories] = useState<Memory[]>(sampleMemories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const filteredMemories = memories.filter(memory => 
    memory.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    memory.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleMemoryClick = (memory: Memory) => {
    // Provide voice feedback for visually impaired users
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Memory: ${memory.title}. ${memory.content}. Created on ${memory.date.toLocaleDateString()}`
      );
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
    
    // Show memory details (in a real app, this might navigate to a detail page)
    toast({
      title: memory.title,
      description: memory.content,
    });
  };
  
  const handleAddMemory = () => {
    // In a real app, this would open a form to add a new memory
    const newMemory: Memory = {
      id: Date.now().toString(),
      title: 'New Memory',
      content: 'Click to edit this memory',
      date: new Date(),
      tags: ['new']
    };
    
    setMemories([newMemory, ...memories]);
    
    // Provide voice feedback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('New memory created');
      window.speechSynthesis.speak(utterance);
    }
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
  };
  
  const handleDeleteMemory = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setMemories(memories.filter(memory => memory.id !== id));
    
    // Provide voice feedback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Memory deleted');
      window.speechSynthesis.speak(utterance);
    }
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };
  
  const handleClearAll = () => {
    setMemories([]);
    
    // Provide voice feedback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('All memories cleared');
      window.speechSynthesis.speak(utterance);
    }
    
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-assistant-purple-light/30">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-assistant-purple-dark text-white p-4 shadow-md">
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
      
      <div className="p-4 sticky top-16 z-10 bg-white shadow-md">
        <div className="flex items-center gap-2 mb-4">
          {isSearching ? (
            <div className="flex-1 flex items-center rounded-lg bg-gray-100 px-3 py-2">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <Input 
                type="text" 
                placeholder="Search memory..." 
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 p-0 h-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setIsSearching(false);
                }}
                aria-label="Clear search"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="flex-1 justify-start text-left font-normal"
              onClick={() => setIsSearching(true)}
              aria-label="Search memories"
            >
              <Search className="w-5 h-5 mr-2" />
              Search memory...
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="p-2 h-10 w-10" 
            onClick={handleAddMemory}
            aria-label="Add new memory"
          >
            <Plus className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            className="p-2 h-10 w-10 text-destructive"
            onClick={handleClearAll}
            aria-label="Clear all memories"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 pb-20 overflow-auto">
        {filteredMemories.length > 0 ? (
          <div className="space-y-4">
            {filteredMemories.map(memory => (
              <Card 
                key={memory.id} 
                className="animate-fade-in shadow-sm hover:shadow transition-shadow"
                onClick={() => handleMemoryClick(memory)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex justify-between items-start">
                    <span>{memory.title}</span>
                    <button 
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={(e) => handleDeleteMemory(memory.id, e)}
                      aria-label={`Delete memory: ${memory.title}`}
                    >
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-700">{memory.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{memory.date.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2">
                    {memory.tags.map(tag => (
                      <div key={tag} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-60 text-gray-500">
            <p className="mb-4">No memories found.</p>
            <Button variant="outline" onClick={handleAddMemory}>
              <Plus className="w-5 h-5 mr-2" />
              Create Memory
            </Button>
          </div>
        )}
      </div>
      
      {/* Floating action button for adding new memory */}
      <button 
        className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-assistant-purple-DEFAULT text-white shadow-lg flex items-center justify-center"
        onClick={handleAddMemory}
        aria-label="Add new memory"
      >
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
};

export default Memory;
