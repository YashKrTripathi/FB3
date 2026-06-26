import React, { useEffect, useState, useRef } from 'react';

// ====================================================
// NATIVE INTERSECTIONOBSERVER-BASED COUNTER COMPONENT
// ====================================================
interface CounterProps {
  target: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ target, decimals = 0, suffix = '', duration = 800 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let startTimestamp: number | null = null;
        
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const currentVal = progress * target;
          setCount(currentVal);
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(target);
          }
        };
        
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <span ref={elementRef} className="font-sans font-bold">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

// ====================================================
// 5-STAR RATING COMPONENT
// ====================================================
const StarRating = () => (
  <div className="flex gap-0.5 text-accent-yellow">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// ====================================================
// TESTIMONIAL DATA
// ====================================================
const testimonials = [
  {
    quote: "Automation helped our care teams spend less time on paperwork and more time with patients, restoring human connection.",
    author: "Dr. Sarah Jenkins",
    role: "Chief Medical Officer",
    hospital: "St. Jude Clinical Center",
    initials: "SJ",
    gradient: "from-accent-orange to-red-400",
    bgColor: "bg-accent-orange/[0.03] border-accent-orange/10 hover:border-accent-orange/30",
  },
  {
    quote: "Workflow orchestration improved coordination across departments and significantly reduced operational delays.",
    author: "Marcus Vance",
    role: "Chief Operations Officer",
    hospital: "Metro Health Hospital",
    initials: "MV",
    gradient: "from-primary-brand to-teal-400",
    bgColor: "bg-primary-brand/[0.03] border-primary-brand/10 hover:border-primary-brand/30",
  },
  {
    quote: "Our operational visibility improved overnight, allowing leadership to make faster and more informed decisions.",
    author: "Elena Rostova",
    role: "Director of Clinical Analytics",
    hospital: "Apex Care Network",
    initials: "ER",
    gradient: "from-accent-yellow to-yellow-500",
    bgColor: "bg-accent-yellow/[0.03] border-accent-yellow/10 hover:border-accent-yellow/30",
  }
];

export const SocialProofSection = () => {
  return (
    <section className="bg-primary-bg pt-20 pb-32" id="success-stories">
      {/* ====================================================
          1. SUCCESS METRICS SECTION (Improved Editorial Design)
         ==================================================== */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16 text-center max-w-4xl mx-auto">
          {/* Centered one-liner heading, no subheadings */}
          <h2 className="text-2xl md:text-4xl text-dark-surface tracking-tight text-center">
            Measurable Outcomes for Clinical Operations
          </h2>
        </div>

        {/* Alternating Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1: Accent Orange Indicator, White BG */}
          <div className="bg-white border border-dark-surface/10 rounded-2xl p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(23,43,54,0.04)] transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-accent-orange"></div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-5xl font-extrabold text-dark-surface tracking-tight mb-4 mt-2">
                  <AnimatedCounter target={70} suffix="%" />
                </p>
                <div className="w-8 h-[2px] bg-accent-orange mb-6"></div>
              </div>
              <p className="text-dark-surface/85 text-xs font-mono font-bold uppercase tracking-widest leading-relaxed">
                Reduction in Administrative Work
              </p>
            </div>
          </div>

          {/* Card 2: Surface Tinted BG (Alternating) */}
          <div className="bg-surface/50 border border-primary-brand/10 rounded-2xl p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(23,43,54,0.04)] transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-primary-brand"></div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-5xl font-extrabold text-primary-brand tracking-tight mb-4 mt-2">
                  <AnimatedCounter target={45} suffix="%" />
                </p>
                <div className="w-8 h-[2px] bg-primary-brand mb-6"></div>
              </div>
              <p className="text-dark-surface/85 text-xs font-mono font-bold uppercase tracking-widest leading-relaxed">
                Faster Patient Processing
              </p>
            </div>
          </div>

          {/* Card 3: Accent Yellow Indicator, White BG */}
          <div className="bg-white border border-dark-surface/10 rounded-2xl p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(23,43,54,0.04)] transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-accent-yellow"></div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-5xl font-extrabold text-dark-surface tracking-tight mb-4 mt-2">
                  <AnimatedCounter target={99.9} decimals={1} suffix="%" />
                </p>
                <div className="w-8 h-[2px] bg-accent-yellow mb-6"></div>
              </div>
              <p className="text-dark-surface/85 text-xs font-mono font-bold uppercase tracking-widest leading-relaxed">
                Platform Reliability
              </p>
            </div>
          </div>

          {/* Card 4: Dark Slate Background (Alternating) */}
          <div className="bg-dark-surface text-white border border-white/10 rounded-2xl p-8 shadow-md hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-white/40"></div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-5xl font-extrabold text-white tracking-tight mb-4 mt-2">
                  <AnimatedCounter target={500} suffix="K+" />
                </p>
                <div className="w-8 h-[2px] bg-white/20 mb-6"></div>
              </div>
              <p className="text-white/80 text-xs font-mono font-bold uppercase tracking-widest leading-relaxed">
                Automated Workflows Monthly
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ====================================================
          2. TESTIMONIALS SECTION (Premium Card Grid)
         ==================================================== */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 text-center max-w-4xl mx-auto">
          {/* Centered one-liner heading, no subheadings */}
          <h2 className="text-2xl md:text-4xl text-dark-surface tracking-tight text-center">
            Trusted by Leading Clinical Networks
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className={`border rounded-2xl p-8 md:p-10 flex flex-col justify-between shadow-sm hover:shadow-[0_20px_40px_rgba(23,43,54,0.06)] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden ${t.bgColor}`}
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary-brand/10 to-transparent"></div>

              <div>
                {/* Quotation Icon & Star Rating */}
                <div className="flex justify-between items-center mb-6">
                  <svg className="w-10 h-10 text-primary-brand/10 group-hover:text-primary-brand/20 transition-colors" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z" />
                  </svg>
                  <StarRating />
                </div>

                {/* Quote Text */}
                <blockquote className="text-dark-surface/90 text-base md:text-lg italic font-sans leading-relaxed mb-8">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Author Info Block */}
              <div className="border-t border-dark-surface/5 pt-6 flex items-center gap-4">
                {/* SVG/Initials Avatar */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-mono font-bold text-sm shadow-inner shrink-0`}>
                  {t.initials}
                </div>
                <div className="overflow-hidden">
                  <cite className="font-bold text-dark-surface not-italic text-base block truncate">
                    {t.author}
                  </cite>
                  <span className="text-xs text-dark-surface/60 font-mono uppercase tracking-wider block mt-0.5 truncate">
                    {t.role}, <span className="font-bold text-primary-brand/80">{t.hospital}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
