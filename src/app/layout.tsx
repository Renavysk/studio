
import type {Metadata} from 'next';
import { Inter } from 'next/font/google' // Using Inter as a gentle, legible font
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/app/components/Header';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: 'Jesus Disse',
  description: 'Um aplicativo para encontrar palavras de conforto e reflexão.',
  icons: {
    icon: 'https://storage.googleapis.com/project-upload-prod/cbe6ae9f-6431-418e-9e7d-605991ac4388',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1, // Opcional: Impede o zoom, comum em web apps que se comportam como apps nativos
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
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
