'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HeartHandshake } from 'lucide-react';

export default function WelcomePage() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 text-center animate-fadeIn">
      <div className="relative w-full max-w-2xl aspect-[3/2] mb-8">
        <Image 
          src="https://placehold.co/600x400.png"
          alt="Paisagem serena estilo Ghibli com nuvens suaves e luz delicada"
          data-ai-hint="ghibli landscape sky"
          fill
          className="object-cover rounded-xl shadow-2xl"
          priority
        />
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <HeartHandshake className="text-primary h-12 w-12 mr-3" />
        <h1 className="text-5xl font-bold text-primary drop-shadow-sm">
          Palavras de Conforto
        </h1>
      </div>
      
      <p className="text-xl text-foreground mb-10 max-w-lg leading-relaxed">
        Receba orientação e reflexões baseadas nos ensinamentos amorosos de Jesus. Selecione um tema que ressoe com você e encontre consolo em Suas palavras.
      </p>
      
      <Button asChild size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
        <Link href="/themes">Explorar Temas</Link>
      </Button>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
