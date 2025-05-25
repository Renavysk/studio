import Link from 'next/link';
import { BookOpenText } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-primary/90 text-primary-foreground py-4 px-6 shadow-md sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-semibold hover:opacity-90 transition-opacity">
          <BookOpenText size={32} />
          Jesus Disse
        </Link>
        {/* Future navigation links can go here */}
      </div>
    </header>
  );
}
