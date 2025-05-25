import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Palavras de Conforto',
  description: 'Encontre consolo e orientação em reflexões baseadas nos ensinamentos de Jesus.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground min-h-screen flex flex-col`}>
        {/* A classe bg-background foi removida daqui pois o background agora é uma imagem definida em globals.css */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
