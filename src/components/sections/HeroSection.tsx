import { CubeSolidIcon } from '../Icons';

export const HeroSection = () => {
  return (
    <>
      <section className="tatva-hero relative flex items-center overflow-hidden" style={{ minHeight: 'min(100svh, 600px)' }}>
        {/* 52px top padding on mobile to clear the fixed hamburger nav */}
        <div className="absolute top-0 left-0 right-0 md:hidden" style={{ height: '52px', pointerEvents: 'none' }} />

        {/* ── DESKTOP: full-bleed video ─────────────────────────── */}
        <div className="hero-video-wrapper absolute inset-0 z-0 bg-dark-surface hidden md:block">
          <video
            src="/hero-video.mp4?v=2"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* ── MOBILE: static GIF image instead of video ─────────── */}
        <div
          className="hero-image-wrapper absolute inset-0 z-0 block md:hidden"
          style={{
            backgroundImage: 'url(/cofounder-2-hero.gif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#172B36',
          }}
        />

        {/* Dark gradient overlay — ensures text readability on both bg types */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/50 via-black/20 to-black/10 pointer-events-none" />

        <div className="container mx-auto px-5 md:px-12 relative z-10 flex justify-start py-10 md:py-0">
          <div className="max-w-xl md:max-w-3xl flex flex-col items-start text-left">

            <div className="flex items-center gap-2.5 mb-5 md:mb-8 animate-slide-up" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
              <CubeSolidIcon className="w-9 h-9 md:w-16 md:h-16 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]" />
              <span
                className="font-sans font-bold text-3xl md:text-6xl tracking-tight text-white"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
              >
                TATVA
              </span>
            </div>

            <h1
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-mono font-extrabold text-white leading-[1.2] tracking-tight animate-slide-up"
              style={{ animationDelay: '100ms', animationFillMode: 'both', textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.4)' }}
            >
              Built for the complexity of<br />modern operations.
            </h1>

            <div className="mt-7 md:mt-10 flex items-center gap-4 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              <button className="h-11 md:h-12 px-8 md:px-10 text-sm md:text-lg inline-flex items-center justify-center rounded-full font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white bg-white text-dark-surface hover:bg-white/90 drop-shadow-md">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
