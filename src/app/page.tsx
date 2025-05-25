
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { processText, type SimpleTextInput } from '@/ai/flows/simple-text-flow'; // Updated import path
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
      const input: SimpleTextInput = { inputText };
      const result = await processText(input);
      setOutputText(result.outputText);
      toast({
        title: 'Sucesso!',
        description: 'Texto processado pela IA.',
      });
    } catch (error: any) {
      console.error('Error calling processText flow:', error);
      setOutputText(`Erro ao processar o texto: ${error.message}`);
      toast({
        title: 'Erro de IA',
        description: error.message || 'Falha ao comunicar com a IA. Verifique os logs do servidor Genkit.',
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
            Digite algo abaixo e a IA tentará processá-lo. Isso ajudará a verificar se a configuração básica da Genkit está funcionando.
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
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
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
        </CardContent>
      </Card>
       <footer className="text-center py-6 mt-8 text-sm text-muted-foreground">
        <p>Verifique o console do servidor Genkit para logs detalhados da API.</p>
        <p>Se isso funcionar, podemos reintroduzir gradualmente a funcionalidade anterior.</p>
      </footer>
    </main>
  );
}
