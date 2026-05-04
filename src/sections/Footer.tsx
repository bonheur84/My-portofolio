import { Code2, Heart, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 border-t border-white/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="flex items-center gap-2 group">
              <Code2 className="w-6 h-6 text-primary transition-transform group-hover:rotate-12" />
              <span className="text-lg font-bold text-gradient">Portfolio</span>
            </a>
            <span className="hidden md:block text-muted-foreground">|</span>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Tous droits réservés.
            </p>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Fait avec <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> et beaucoup de café
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
          >
            Retour en haut
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-center text-xs text-muted-foreground/60">
            Construit avec React, TypeScript, Tailwind CSS, GSAP & shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
};
