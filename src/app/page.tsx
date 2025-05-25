
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HeartHandshake } from 'lucide-react';

export default function WelcomePage() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 text-center animate-fadeIn">
      <div className="relative w-full max-w-md aspect-square mb-8">
        <Image 
          src="https://storage.googleapis.com/project-upload-prod/cbe6ae9f-6431-418e-9e7d-605991ac4388"
          alt="Detalhe das mãos de 'A Criação de Adão', de Michelangelo, simbolizando a conexão divina e o toque da vida."
          data-ai-hint="michelangelo creation"
          fill
          className="object-cover rounded-xl shadow-2xl"
          priority
        />
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <HeartHandshake className="text-primary h-12 w-12 mr-3" />
        <h1 className="text-5xl font-bold text-primary drop-shadow-sm">
          Jesus Disse
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
