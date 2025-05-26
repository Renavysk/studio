
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { processText, type SimpleTextInput } from '@/ai/flows/simple-text-flow';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Share2 } from 'lucide-react'; // Adicionado Share2

export default function SimpleAIPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoadingText, setIsLoadingText] = useState(false);
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

    try {
      const textInput: SimpleTextInput = { inputText };
      const textResult = await processText(textInput);
      
      if (!textResult || typeof textResult.outputText !== 'string') {
        console.error('Error: AI model did not return a valid outputText string from processText. Received:', textResult);
        throw new Error('O modelo de IA não retornou um texto válido.');
      }
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
      setIsLoadingText(false);
    }
  };

  const handleShare = async () => {
    if (!outputText || outputText.startsWith('Erro ao processar o texto:')) return;

    const shareText = `"${outputText}"\n\nDisse Jesus (via app Jesus Disse).`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Jesus Disse',
          text: shareText,
        });
        // O toast de sucesso para navigator.share geralmente não é necessário,
        // pois o sistema operacional fornece feedback.
      } catch (error: any) {
        // AbortError ocorre se o usuário fechar a caixa de diálogo de compartilhamento, não é um erro real.
        if (error.name !== 'AbortError') {
          console.error('Erro ao compartilhar nativamente:', error);
          toast({
            title: 'Erro ao Compartilhar',
            description: 'Não foi possível usar o compartilhamento nativo.',
            variant: 'destructive',
          });
        }
      }
    } else {
      // Fallback para copiar para a área de transferência
      try {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: 'Mensagem Copiada!',
          description: 'A mensagem foi copiada para a sua área de transferência.',
        });
      } catch (err) {
        console.error('Erro ao copiar para a área de transferência:', err);
        toast({
          title: 'Erro ao Copiar',
          description: 'Não foi possível copiar a mensagem.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 md:p-8">
      <Card className="w-full max-w-lg shadow-xl rounded-lg bg-card/90 backdrop-blur-sm">
        <CardHeader className="rounded-t-lg items-center text-center pt-6 pb-4">
          <div className="mb-4 rounded-full overflow-hidden shadow-lg border-2 border-primary/50 mx-auto" style={{ width: 120, height: 120 }}>
            <Image
              src="/jesus disse.png" 
              alt="Imagem Jesus Disse"
              width={120}
              height={120}
              className="object-cover w-full h-full"
              data-ai-hint="jesus logo"
              priority
            />
          </div>
          <CardTitle className="text-3xl font-semibold text-primary">Jesus Disse</CardTitle>
          <CardDescription className="text-card-foreground/80 mt-1 px-2">
            Digite algo abaixo e lhe responderei com sabedoria e amor.
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
              {!outputText.startsWith('Erro ao processar o texto:') && (
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    disabled={isLoadingText}
                    className="rounded-md"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar Mensagem
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
       <footer className="text-center py-6 mt-10 text-sm text-foreground/90 bg-background/50 backdrop-blur-sm p-4 rounded-md shadow-md max-w-lg w-full">
        <p>Lembre-se, estas são palavras geradas por IA, inspiradas nos ensinamentos de Jesus.</p>
        <p>Use-as para reflexão e encorajamento.</p>
      </footer>
    </main>
  );
}
