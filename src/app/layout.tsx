
import type {Metadata} from 'next';
import { Inter } from 'next/font/google' // Using Inter as a gentle, legible font
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from './components/Header'; // Assuming Header will be styled by globals

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: 'Jesus Disse - Teste IA',
  description: 'Um estado simplificado do aplicativo para testar a funcionalidade básica da IA com a personalidade de Jesus.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased text-foreground bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
         {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
