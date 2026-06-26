import { useState } from 'react';
import { CubeSolidIcon } from '../Icons';

const companies = [
  { name: 'RANGE ROVER', icon: null },
  { name: '3M', icon: null, font: 'font-black text-3xl' },
  { name: 'ACADEMY BANK', icon: CubeSolidIcon },
  { name: 'JAGUAR', icon: null },
  { name: 'SABRE', icon: null },
  { name: 'PHILIPS', icon: null },
];

export const MarqueeSection = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="bg-white border-b border-dark-surface/5 py-6 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        
        {/* Left Text */}
        <div className="text-dark-surface/70 font-sans font-medium whitespace-nowrap z-10 bg-white pr-4">
          Trusted by 25 of the Fortune 100
        </div>

        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
          <div 
            className="flex w-max animate-marquee-half"
            style={{ 
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {/* Duplicated for seamless loop */}
            {[...companies, ...companies].map((company, index) => {
              const Icon = company.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-center gap-2 text-dark-surface/40 mx-8 md:mx-12 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all cursor-default"
                >
                  {Icon && <Icon className="w-6 h-6" />}
                  <span className={`font-sans tracking-widest uppercase ${company.font || 'font-bold text-xl'}`}>
                    {company.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pause Button */}
        <button 
          className="text-dark-surface/50 hover:text-dark-surface transition-colors z-10 bg-white pl-4"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Play animation" : "Pause animation"}
        >
          {isPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

      </div>
    </section>
  );
};
