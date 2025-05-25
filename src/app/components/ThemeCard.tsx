import Link from 'next/link';
import Image from 'next/image';
import type { Theme } from '@/lib/themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightCircle } from 'lucide-react';

interface ThemeCardProps {
  theme: Theme;
}

export function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <Link href={`/reflection/${theme.id}`} className="group block h-full">
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 ease-in-out rounded-xl border-2 border-transparent hover:border-primary transform hover:-translate-y-1">
        <CardHeader className="p-0 relative aspect-[3/2] w-full">
          <Image
            src={theme.imageUrl}
            alt={theme.name}
            data-ai-hint={theme.imageHint}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-between bg-card">
          <div>
            <CardTitle className="text-xl font-semibold text-primary group-hover:text-primary/80 transition-colors mb-2">{theme.name}</CardTitle>
          </div>
          <div className="mt-4 flex justify-end items-center text-sm text-accent-foreground group-hover:text-primary transition-colors">
            Read Reflection <ArrowRightCircle size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
