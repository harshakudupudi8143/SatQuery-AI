import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

interface VoiceReaderProps {
  text: string;
}

export function VoiceReader({ text }: VoiceReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const toggleVoice = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for kids
      utterance.pitch = 1.1; // Slightly higher/friendly
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!isSupported) return null;

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleVoice}
      className={`rounded-full w-10 h-10 p-0 ${isPlaying ? 'bg-primary/20 text-primary' : 'text-textMuted'}`}
      aria-label="Read text aloud"
    >
      {isPlaying ? <Volume2 className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  );
}
