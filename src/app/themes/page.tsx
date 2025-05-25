import { themes } from '@/lib/themes';
import { ThemeCard } from '@/app/components/ThemeCard';
import { Header } from '@/app/components/Header';

export default function ThemesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <h2 className="text-4xl font-bold text-primary mb-3 text-center">Selecione um Tema</h2>
        <p className="text-center text-lg text-foreground mb-10 max-w-2xl mx-auto">
          Escolha um tópico que toque seu coração e receba uma reflexão reconfortante inspirada na sabedoria atemporal de Jesus.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        Inspirado pela fé, criado com carinho.
      </footer>
    </div>
  );
}
