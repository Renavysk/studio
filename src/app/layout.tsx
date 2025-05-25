
import type {Metadata} from 'next';
import { Inter } from 'next/font/google' // Using Inter as a gentle, legible font
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from './components/Header';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: 'Jesus Disse',
  description: 'Um aplicativo para encontrar palavras de conforto e reflexão.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      {/* Removed bg-background and text-foreground from body as it's handled in globals.css now */}
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
         {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
