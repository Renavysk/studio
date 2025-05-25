
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { processText, type SimpleTextInput } from '@/ai/flows/simple-text-flow';
import { narrateText, type NarrateTextInput } from '@/ai/flows/narrate-text-flow';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Volume2 } from 'lucide-react';

export default function SimpleAIPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
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

    setIsLoading(true);
    setIsNarrating(false);
    setOutputText('');
    setAudioSrc('');

    try {
      const textInput: SimpleTextInput = { inputText };
      const textResult = await processText(textInput);
      setOutputText(textResult.outputText);
      toast({
        title: 'Sucesso!',
        description: 'Texto processado pela IA.',
      });

      if (textResult.outputText && textResult.outputText.trim()) {
        setIsNarrating(true);
        try {
          const narrationInput: NarrateTextInput = { textToNarrate: textResult.outputText };
          const audioResult = await narrateText(narrationInput);
          if (audioResult.audioDataUri) {
            setAudioSrc(audioResult.audioDataUri);
            toast({
              title: 'Narração Pronta!',
              description: 'O áudio da resposta está disponível.',
            });
          } else {
             toast({
              title: 'Narração Indisponível',
              description: 'Não foi possível gerar o áudio para esta resposta (texto vazio ou problema menor).',
              variant: 'default',
            });
          }
        } catch (narrationError: any) {
          console.error('Error calling narrateText flow on client:', narrationError);
          // Try to extract a meaningful message from the error object
          let errorMessage = 'Falha ao gerar o áudio. Verifique os logs do servidor Genkit para detalhes.';
          if (narrationError instanceof Error && narrationError.message) {
            errorMessage = narrationError.message;
          } else if (typeof narrationError === 'string') {
            errorMessage = narrationError;
          } else if (narrationError && typeof narrationError === 'object' && narrationError.toString() !== '[object Object]') {
            errorMessage = narrationError.toString();
          }
          
          toast({
            title: 'Erro na Narração',
            description: errorMessage,
            variant: 'destructive',
          });
        } finally {
          setIsNarrating(false);
        }
      }
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
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:p-8">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Teste Simples de IA com Genkit</CardTitle>
          <CardDescription>
            Digite algo abaixo e a IA (Jesus) tentará processá-lo e fornecer uma narração.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="inputText" className="block text-sm font-medium text-foreground mb-1">
                Seu Texto:
              </label>
              <Input
                id="inputText"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Digite algo aqui..."
                className="w-full"
                disabled={isLoading || isNarrating}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || isNarrating}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando Texto...
                </>
              ) : isNarrating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando Narração...
                </>
              ) : (
                'Enviar para IA'
              )}
            </Button>
          </form>
          {outputText && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Resposta da IA:</h3>
              <Textarea
                value={outputText}
                readOnly
                className="w-full h-32 bg-muted/50"
                aria-label="Resposta da IA"
              />
            </div>
          )}
          {isNarrating && !audioSrc && (
            <div className="mt-4 flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Gerando narração da resposta...</p>
            </div>
          )}
          {audioSrc && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-primary mb-2 flex items-center">
                <Volume2 className="mr-2 h-5 w-5" />
                Narração:
              </h3>
              <audio controls src={audioSrc} className="w-full" aria-label="Player da narração da resposta da IA">
                Seu navegador não suporta o elemento de áudio.
              </audio>
            </div>
          )}
        </CardContent>
      </Card>
       <footer className="text-center py-6 mt-8 text-sm text-muted-foreground">
        <p>Verifique o console do servidor Genkit para logs detalhados da API.</p>
        <p>Se isso funcionar, podemos reintroduzir gradualmente a funcionalidade anterior.</p>
      </footer>
    </main>
  );
}
