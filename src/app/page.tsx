
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { processText, type SimpleTextInput } from '@/ai/flows/simple-text-flow';
// import { narrateText, type NarrateTextInput } from '@/ai/flows/narrate-text-flow'; // Narration removed
import { useToast } from '@/hooks/use-toast';
import { Loader2, Volume2, AlertTriangle } from 'lucide-react';

export default function SimpleAIPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoadingText, setIsLoadingText] = useState(false);
  // const [isLoadingAudio, setIsLoadingAudio] = useState(false); // Narration removed
  // const [audioDataUri, setAudioDataUri] = useState<string | null>(null); // Narration removed
  // const [audioError, setAudioError] = useState<string | null>(null); // Narration removed
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      toast({
        title: 'Entrada vazia',
        description: 'Por favor, digite algum texto.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoadingText(true);
    setOutputText('');
    // setAudioDataUri(null); // Narration removed
    // setAudioError(null); // Narration removed

    try {
      const textInput: SimpleTextInput = { inputText };
      const textResult = await processText(textInput);
      setOutputText(textResult.outputText);
      toast({
        title: 'Sucesso!',
        description: 'Texto processado pela IA.',
      });

      // Narration functionality removed
      // if (textResult.outputText) {
      //   setIsLoadingAudio(true);
      //   try {
      //     const narrationInput: NarrateTextInput = { textToNarrate: textResult.outputText };
      //     const audioResult = await narrateText(narrationInput);
      //     if (audioResult.audioDataUri) {
      //       setAudioDataUri(audioResult.audioDataUri);
      //       toast({
      //         title: 'Narração Pronta!',
      //         description: 'O áudio da resposta foi gerado.',
      //       });
      //     } else {
      //       setAudioError('Nenhum áudio retornado pelo serviço.');
      //       toast({
      //         title: 'Erro na Narração',
      //         description: 'O serviço não retornou dados de áudio.',
      //         variant: 'destructive',
      //       });
      //     }
      //   } catch (narrationError: any) {
      //     console.error('Error calling narrateText flow on client:', narrationError);
      //     let narrationErrorMessage = 'Falha ao gerar narração. Verifique os logs do servidor Genkit.';
      //     if (narrationError instanceof Error && narrationError.message) {
      //       narrationErrorMessage = narrationError.message;
      //     } else if (typeof narrationError === 'string') {
      //       narrationErrorMessage = narrationError;
      //     } else if (narrationError && typeof narrationError === 'object' && narrationError.toString() !== '[object Object]') {
      //       narrationErrorMessage = narrationError.toString();
      //     }
      //     setAudioError(narrationErrorMessage);
      //     toast({
      //       title: 'Erro de Narração',
      //       description: narrationErrorMessage,
      //       variant: 'destructive',
      //     });
      //   } finally {
      //     setIsLoadingAudio(false);
      //   }
      // }

    } catch (error: any) {
      console.error('Error calling processText flow on client:', error);
      let errorMessage = 'Falha ao comunicar com a IA. Verifique os logs do servidor Genkit.';
       if (error instanceof Error && error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && error.toString() !== '[object Object]') {
        errorMessage = error.toString();
      }
      setOutputText(`Erro ao processar o texto: ${errorMessage}`);
      toast({
        title: 'Erro de IA',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoadingText(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:p-8">
      <Card className="w-full max-w-lg shadow-xl rounded-lg bg-card/90 backdrop-blur-sm">
        <CardHeader className="rounded-t-lg">
          <CardTitle className="text-3xl font-semibold text-primary text-center">Jesus Disse</CardTitle>
          <CardDescription className="text-center text-card-foreground/80">
            Digite algo abaixo e Jesus tentará processá-lo e responder com sabedoria e amor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="inputText" className="block text-sm font-medium text-card-foreground mb-1">
                Sua Mensagem ou Pergunta:
              </label>
              <Input
                id="inputText"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="O que está em seu coração?"
                className="w-full rounded-md text-base"
                disabled={isLoadingText}
              />
            </div>
            <Button type="submit" className="w-full rounded-md text-base py-3" disabled={isLoadingText}>
              {isLoadingText ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando para Jesus...
                </>
              ) : (
                'Enviar para Jesus'
              )}
            </Button>
          </form>
          {outputText && (
            <div className="mt-6 pt-6 border-t border-border/50">
              <h3 className="text-xl font-semibold text-primary mb-3 text-center">Palavras de Jesus:</h3>
              <Textarea
                value={outputText}
                readOnly
                className="w-full h-40 bg-muted/70 rounded-md text-base p-3 leading-relaxed"
                aria-label="Resposta da IA"
              />
            </div>
          )}
          {/* Narration UI removed */}
          {/* {isLoadingAudio && (
            <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando narração...
            </div>
          )}
          {audioError && !isLoadingAudio && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-sm text-destructive flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 shrink-0" />
              <div>
                <strong>Erro na Narração:</strong> {audioError}
              </div>
            </div>
          )}
          {audioDataUri && !isLoadingAudio && !audioError && (
             <div className="mt-4">
              <h4 className="text-md font-medium text-primary mb-2">Ouça a Resposta:</h4>
              <audio controls src={audioDataUri} className="w-full rounded-md shadow">
                Seu navegador não suporta o elemento de áudio.
              </audio>
            </div>
          )} */}
        </CardContent>
      </Card>
       <footer className="text-center py-6 mt-10 text-sm text-background/80 bg-black/30 backdrop-blur-sm p-4 rounded-md shadow-md max-w-lg w-full">
        <p>Lembre-se, estas são palavras geradas por IA, inspiradas nos ensinamentos de Jesus.</p>
        <p>Use-as para reflexão e encorajamento.</p>
      </footer>
    </main>
  );
}
