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
  const themeName = currentTheme ? currentTheme.name : "Reflection";
  return {
    title: `${themeName} | Words of Comfort`,
    description: `A comforting reflection on ${themeName.toLowerCase()} from Words of Comfort.`,
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
    const reflectionInput: GenerateReflectionInput = { theme: currentTheme.name };
    const reflectionOutput = await generateReflection(reflectionInput);
    reflectionText = reflectionOutput.reflection;
  } catch (error) {
    console.error(`Error generating reflection for theme "${currentTheme.name}":`, error);
    reflectionText = "We encountered an issue generating your reflection. Please try a different theme or come back later.";
    errorOccurred = true;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto py-10 px-4 flex flex-col items-center flex-grow">
        <div className="relative w-full max-w-md aspect-[4/3] mb-8">
          <Image
            src="https://placehold.co/400x300.png" // Ghibli-style Jesus, smiling and calm
            alt={`Jesus, calm and welcoming, in a Ghibli-inspired style, representing ${currentTheme.name}`}
            data-ai-hint="jesus smiling ghibli peaceful"
            fill
            className="object-contain rounded-xl shadow-xl"
            priority
          />
        </div>
        
        <h2 className="text-4xl font-bold text-primary mb-6 text-center drop-shadow-sm">{currentTheme.name}</h2>
        
        {errorOccurred ? (
          <div className="bg-destructive/10 border border-destructive text-destructive p-6 rounded-xl shadow-lg w-full max-w-2xl text-center">
            <h3 className="text-xl font-semibold mb-2">Unable to Load Reflection</h3>
            <p>{reflectionText}</p>
          </div>
        ) : (
          <ReflectionDisplay reflection={reflectionText} themeName={currentTheme.name} />
        )}

        <Button asChild variant="outline" className="mt-10 rounded-full shadow hover:shadow-md transition-shadow">
          <Link href="/themes" className="flex items-center gap-2">
            <ArrowLeftCircle size={20} />
            Back to Themes
          </Link>
        </Button>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        May these words bring you peace and understanding.
      </footer>
    </div>
  );
}
