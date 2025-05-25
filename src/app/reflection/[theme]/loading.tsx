import { Header } from '@/app/components/Header';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeftCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function LoadingReflection() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto py-10 px-4 flex flex-col items-center flex-grow">
        <Skeleton className="w-full max-w-md h-[300px] rounded-xl mb-8" /> {/* Placeholder for Image */}
        
        <Skeleton className="h-10 w-3/4 sm:w-1/2 mb-6" /> {/* Placeholder for Theme Title */}
        
        <Card className="w-full max-w-3xl shadow-xl rounded-xl">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-36 rounded-full" /> {/* Placeholder for Play Audio Button */}
              <Skeleton className="h-12 w-40 rounded-full" /> {/* Placeholder for Share Button */}
            </div>
          </CardContent>
        </Card>

        <Button asChild variant="outline" className="mt-10 rounded-full shadow" disabled>
          <Link href="/themes" className="flex items-center gap-2">
            <ArrowLeftCircle size={20} />
            Voltar aos Temas
          </Link>
        </Button>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        Carregando palavras de conforto...
      </footer>
    </div>
  );
}
