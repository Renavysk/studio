
import { generateReflection, type GenerateReflectionInput } from '@/ai/flows/generate-reflection';
import { themes } from '@/lib/themes';
import { ReflectionDisplay } from '@/app/components/ReflectionDisplay';
import { Header } from '@/app/components/Header';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftCircle } from 'lucide-react';

interface ReflectionPageProps {
  params: { theme: string };
}

export async function generateMetadata({ params }: ReflectionPageProps) {
  const themeId = params.theme;
  const currentTheme = themes.find(t => t.id === themeId);
  const themeName = currentTheme ? currentTheme.name : "Reflexão";
  return {
    title: `${themeName} | Palavras de Conforto`,
    description: currentTheme ? currentTheme.description : `Uma reflexão reconfortante sobre ${themeName.toLowerCase()} de Palavras de Conforto.`,
  };
}

export default async function ReflectionPage({ params }: ReflectionPageProps) {
  const themeId = params.theme;
  const currentTheme = themes.find(t => t.id === themeId);

  if (!currentTheme) {
    notFound();
  }

  let reflectionText = "";
  let errorOccurred = false;
  try {
    const reflectionInput: GenerateReflectionInput = {
      theme: currentTheme.name,
      baseReflection: currentTheme.baseReflection,
      verseReference: currentTheme.verseReference,
      verseText: currentTheme.verseText,
    };
    const reflectionOutput = await generateReflection(reflectionInput);
    reflectionText = reflectionOutput.reflection;
  } catch (error) {
    console.error(`Error generating reflection for theme "${currentTheme.name}":`, error);
    reflectionText = "Encontramos um problema ao gerar sua reflexão. Por favor, tente um tema diferente ou volte mais tarde.";
    errorOccurred = true;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto py-10 px-4 flex flex-col items-center flex-grow">
        <div className="relative w-full max-w-md aspect-[4/3] mb-8">
          <Image
            src="https://placehold.co/400x300.png" 
            alt={`Imagem estilo Ghibli representando o tema ${currentTheme.name}`}
            data-ai-hint={currentTheme.imageHint}
            fill
            className="object-contain rounded-xl shadow-xl"
            priority
          />
        </div>
        
        <h2 className="text-4xl font-bold text-primary mb-2 text-center drop-shadow-sm">{currentTheme.name}</h2>
        <p className="text-lg text-muted-foreground mb-6 text-center max-w-xl">{currentTheme.description}</p>
        
        {errorOccurred ? (
          <div className="bg-destructive/10 border border-destructive text-destructive p-6 rounded-xl shadow-lg w-full max-w-2xl text-center">
            <h3 className="text-xl font-semibold mb-2">Não Foi Possível Carregar a Reflexão</h3>
            <p>{reflectionText}</p>
          </div>
        ) : (
          <ReflectionDisplay reflection={reflectionText} themeName={currentTheme.name} />
        )}

        <Button asChild variant="outline" className="mt-10 rounded-full shadow hover:shadow-md transition-shadow">
          <Link href="/themes" className="flex items-center gap-2">
            <ArrowLeftCircle size={20} />
            Voltar aos Temas
          </Link>
        </Button>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        Que estas palavras lhe tragam paz e compreensão.
      </footer>
    </div>
  );
}
