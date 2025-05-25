"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Volume2, Loader2, AlertTriangle, PauseCircle, PlayCircle } from 'lucide-react';
import { narrateReflection, type NarrateReflectionInput } from '@/ai/flows/narrate-reflection';
import { useToast } from '@/hooks/use-toast';

interface ReflectionDisplayProps {
  reflection: string;
  themeName: string;
}

export function ReflectionDisplay({ reflection, themeName }: ReflectionDisplayProps) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    audioRef.current = new Audio();
    
    const currentAudioRef = audioRef.current; // Capture for cleanup

    currentAudioRef.onended = () => setIsPlaying(false);
    currentAudioRef.onplaying = () => setIsPlaying(true);
    currentAudioRef.onpause = () => setIsPlaying(false);
    currentAudioRef.onerror = (e) => {
      console.error("Audio error:", e);
      setAudioError("Error playing audio. The audio file might be corrupted or unsupported.");
      setIsPlaying(false);
      setIsLoadingAudio(false);
      toast({
        title: "Audio Playback Error",
        description: "Could not play the audio. Please try again or check your connection.",
        variant: "destructive",
      });
    };
    
    return () => {
      if (currentAudioRef) {
        currentAudioRef.pause();
        currentAudioRef.src = ''; // Release audio resources
      }
    };
  }, [toast]);

  const handlePlayAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioSrc) {
        audioRef.current.src = audioSrc; // Ensure src is set before play
        audioRef.current.play().catch(err => {
          console.error("Error initiating playback:", err);
          setAudioError("Playback failed. Your browser might have blocked autoplay.");
          setIsPlaying(false);
          toast({ title: "Playback Issue", description: "Could not start audio. Try interacting with the page first.", variant: "destructive"});
        });
      } else {
        setIsLoadingAudio(true);
        setAudioError(null);
        try {
          const narrationInput: NarrateReflectionInput = { reflectionText: reflection };
          const narrationOutput = await narrateReflection(narrationInput);
          if (narrationOutput.audioDataUri) {
            setAudioSrc(narrationOutput.audioDataUri);
            audioRef.current.src = narrationOutput.audioDataUri;
            audioRef.current.play().catch(err => {
              console.error("Error initiating playback after load:", err);
              setAudioError("Playback failed. Your browser might have blocked autoplay.");
              setIsPlaying(false);
              toast({ title: "Playback Issue", description: "Could not start audio. Try interacting with the page first.", variant: "destructive"});
            });
          } else {
            throw new Error("Audio data URI is empty.");
          }
        } catch (error) {
          console.error("Error narrating reflection:", error);
          setAudioError("Failed to load audio narration.");
          toast({
            title: "Audio Generation Error",
            description: "Could not load the audio narration. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setIsLoadingAudio(false);
        }
      }
    }
  };

  const handleShare = () => {
    const shareText = `Reflection on "${themeName}":\n\n${reflection}\n\nShared from Words of Comfort.`;
    if (navigator.share) {
      navigator.share({
        title: `Words of Comfort: ${themeName}`,
        text: shareText,
      }).catch(err => {
        console.error("Error sharing:", err);
        toast({ title: "Share Failed", description: "Could not share. Please try again.", variant: "destructive"});
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: "Copied to clipboard!",
          description: "Reflection copied. You can now paste it to share.",
        });
      }).catch(() => {
         toast({
          title: "Copy Failed",
          description: "Could not copy to clipboard. Please try manually.",
          variant: "destructive",
        });
      });
    }
  };

  const paragraphs = reflection.split(/\n+/).filter(p => p.trim() !== "");


  return (
    <Card className="w-full max-w-3xl shadow-xl rounded-xl bg-card/90 backdrop-blur-sm border-primary/20">
      <CardContent className="p-6 md:p-8">
        <div className="text-foreground max-w-none space-y-4 text-lg/relaxed md:text-xl/loose selection:bg-primary/30">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="first-letter:text-3xl first-letter:font-semibold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={handlePlayAudio} disabled={isLoadingAudio} className="rounded-full px-6 py-3 text-base shadow-md hover:shadow-lg transition-shadow">
            {isLoadingAudio ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : isPlaying ? (
              <PauseCircle className="mr-2 h-5 w-5" />
            ) : (
              <PlayCircle className="mr-2 h-5 w-5" />
            )}
            {isLoadingAudio ? 'Loading Audio...' : isPlaying ? 'Pause Audio' : 'Play Audio'}
          </Button>
          <Button onClick={handleShare} variant="outline" className="rounded-full px-6 py-3 text-base shadow-md hover:shadow-lg transition-shadow">
            <Share2 className="mr-2 h-5 w-5" />
            Share Reflection
          </Button>
        </div>
        {audioError && (
          <p className="text-destructive text-sm mt-4 text-center flex items-center justify-center gap-2">
            <AlertTriangle size={18} /> {audioError}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
