import { CubeSolidIcon } from '../Icons';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-surface text-surface py-12 border-t border-white/10 relative overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Decorative subtle background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline Group */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <CubeSolidIcon className="w-6 h-6 text-accent-yellow" />
              <span className="font-mono font-bold text-xl text-white tracking-tight">TATVA</span>
            </div>
            <span className="hidden md:inline text-white/20">|</span>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed font-sans max-w-lg">
              Transform fragmented enterprise data into autonomous workflows and intelligent clinical business decisions.
            </p>
          </div>
          
          {/* Developer & Legal info */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <p className="text-white/80 text-xs font-mono uppercase tracking-widest">
              Developed by <span className="text-accent-yellow font-bold">YashT</span>
            </p>
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-wider">
              &copy; {currentYear} TATVA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
