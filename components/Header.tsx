import Link from 'next/link';
import { Code, Mail } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white/60 backdrop-blur sticky top-0 z-40 border-b">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-3">
          <Code className="h-6 w-6 text-sky-700" />
          <span className="font-semibold">Avik Mandal</span>
        </Link>
        <nav className="flex items-center gap-4">
          <a href="#projects" className="text-sm">Projects</a>
          <a href="#about" className="text-sm">About</a>
          <a href="#contact" className="text-sm flex items-center gap-1">
            <Mail className="h-4 w-4" /> Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
