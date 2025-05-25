
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { processText, type SimpleTextInput } from '@/ai/flows/simple-text-flow';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function SimpleAIPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    setOutputText('');

    try {
      const textInput: SimpleTextInput = { inputText };
      const textResult = await processText(textInput);
      setOutputText(textResult.outputText);
      toast({
        title: 'Sucesso!',
        description: 'Texto processado pela IA.',
      });
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
    // Removed bg-background from main to allow body background image to show
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:p-8">
      <Card className="w-full max-w-lg shadow-xl rounded-lg">
        <CardHeader className="rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-primary">Jesus Disse</CardTitle>
          <CardDescription>
            Digite algo abaixo e Jesus tentará processá-lo e responder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="inputText" className="block text-sm font-medium text-card-foreground mb-1">
                Seu Texto:
              </label>
              <Input
                id="inputText"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Digite algo aqui..."
                className="w-full rounded-md"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full rounded-md" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando Texto...
                </>
              ) : (
                'Enviar para IA'
              )}
            </Button>
          </form>
          {outputText && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Resposta de Jesus:</h3>
              <Textarea
                value={outputText}
                readOnly
                className="w-full h-32 bg-muted/50 rounded-md" // bg-muted/50 for slight transparency on the textarea
                aria-label="Resposta da IA"
              />
            </div>
          )}
        </CardContent>
      </Card>
       <footer className="text-center py-6 mt-8 text-sm text-muted-foreground bg-background/70 p-4 rounded-md shadow-md">
        <p>Verifique o console do servidor Genkit para logs detalhados da API.</p>
        <p>Este é um modo de teste simplificado. As funcionalidades anteriores podem ser reintroduzidas.</p>
      </footer>
    </main>
  );
}
