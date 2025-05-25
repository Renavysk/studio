
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
    // Initialize Audio object only on client side
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      
      const currentAudioRef = audioRef.current; 

      currentAudioRef.onended = () => setIsPlaying(false);
      currentAudioRef.onplaying = () => setIsPlaying(true);
      currentAudioRef.onpause = () => setIsPlaying(false);
      currentAudioRef.onerror = (e) => {
        console.error("Audio error event:", e);
        const specificError = currentAudioRef.error ? ` (Code: ${currentAudioRef.error.code}, Message: ${currentAudioRef.error.message})` : '';
        const errorMessage = `Erro ao reproduzir o áudio${specificError}. O arquivo pode estar corrompido ou não ser suportado.`;
        setAudioError(errorMessage);
        setIsPlaying(false);
        setIsLoadingAudio(false);
        toast({
          title: "Erro na Reprodução de Áudio",
          description: errorMessage,
          variant: "destructive",
        });
      };
      
      return () => {
        if (currentAudioRef) {
          currentAudioRef.pause();
          currentAudioRef.src = ''; 
          // Clean up event listeners
          currentAudioRef.onended = null;
          currentAudioRef.onplaying = null;
          currentAudioRef.onpause = null;
          currentAudioRef.onerror = null;
        }
      };
    }
  }, [toast]);

  const handlePlayAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioSrc) {
        audioRef.current.src = audioSrc; 
        audioRef.current.play().catch(err => {
          console.error("Error initiating playback from existing src:", err);
          setAudioError("Falha na reprodução. Seu navegador pode ter bloqueado a reprodução automática ou o formato não é suportado.");
          setIsPlaying(false);
          toast({ title: "Problema na Reprodução", description: "Não foi possível iniciar o áudio. Tente interagir com a página primeiro.", variant: "destructive"});
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
              setAudioError("Falha na reprodução. Seu navegador pode ter bloqueado a reprodução automática ou o formato não é suportado.");
              setIsPlaying(false);
              toast({ title: "Problema na Reprodução", description: "Não foi possível iniciar o áudio. Tente interagir com a página primeiro.", variant: "destructive"});
            });
          } else {
            // This case should ideally be handled by an error thrown from narrateReflection
            throw new Error("Audio data URI is empty or narrateReflection failed silently.");
          }
        } catch (error: any) {
          console.error("Error narrating reflection (handlePlayAudio):", error);
          const errorMessage = error instanceof Error ? error.message : "Falha ao carregar a narração em áudio. Tente novamente.";
          setAudioError(errorMessage);
          toast({
            title: "Erro na Geração de Áudio",
            description: errorMessage,
            variant: "destructive",
          });
        } finally {
          setIsLoadingAudio(false);
        }
      }
    }
  };

  const handleShare = () => {
    const shareText = `Reflexão sobre "${themeName}" de Jesus Disse:\n\n${reflection}\n\nCompartilhado de Jesus Disse.`;
    if (navigator.share) {
      navigator.share({
        title: `Jesus Disse: ${themeName}`,
        text: shareText,
      }).catch(err => {
        console.error("Error sharing:", err);
        toast({ title: "Falha ao Compartilhar", description: "Não foi possível compartilhar. Tente novamente.", variant: "destructive"});
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: "Copiado para a área de transferência!",
          description: "Reflexão copiada. Agora você pode colá-la para compartilhar.",
        });
      }).catch(() => {
         toast({
          title: "Falha ao Copiar",
          description: "Não foi possível copiar para a área de transferência. Tente manualmente.",
          variant: "destructive",
        });
      });
    }
  };

  const paragraphs = reflection.split(/\\n+/).filter(p => p.trim() !== "");


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
          <Button onClick={handlePlayAudio} disabled={isLoadingAudio || !reflection} className="rounded-full px-6 py-3 text-base shadow-md hover:shadow-lg transition-shadow">
            {isLoadingAudio ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : isPlaying ? (
              <PauseCircle className="mr-2 h-5 w-5" />
            ) : (
              <PlayCircle className="mr-2 h-5 w-5" />
            )}
            {isLoadingAudio ? 'Carregando Áudio...' : isPlaying ? 'Pausar Áudio' : 'Reproduzir Áudio'}
          </Button>
          <Button onClick={handleShare} disabled={!reflection} variant="outline" className="rounded-full px-6 py-3 text-base shadow-md hover:shadow-lg transition-shadow">
            <Share2 className="mr-2 h-5 w-5" />
            Compartilhar Reflexão
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
